import asyncio
import time
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter()

NHL_STATS_URL = "https://api.nhle.com/stats/rest/en/skater/summary"

SEASON_ID = 20262027
MIN_GAMES = 10
CACHE_TTL = 60 * 60 * 6  # 6 hours

# Maps frontend stat names to NHL API fields.
# Each value will be converted to a per-game rate.
STAT_FIELDS = {
    "goals": "goals",
    "assists": "assists",
    "points": "points",
    "shots": "shots",
    "powerPlayGoals": "ppGoals",
    "gameWinningGoals": "gameWinningGoals",
}

_cache: dict[str, Any] = {
    "expires_at": 0.0,
    "data": None,
}

_cache_lock = asyncio.Lock()


def calculate_percentile(
    value: float,
    league_values: list[float],
) -> int:
    if not league_values:
        return 0

    below = sum(v < value for v in league_values)
    equal = sum(v == value for v in league_values)

    return round(
        100 * (below + 0.5 * equal) / len(league_values)
    )


def get_player_rates(player: dict) -> dict[str, float]:
    games = player["gamesPlayed"]

    return {
        name: round(float(player[field]) / games, 4)
        for name, field in STAT_FIELDS.items()
    }


async def fetch_league_stats() -> list[dict]:
    params = {
        "cayenneExp": (
            f"seasonId={SEASON_ID} and gameTypeId=2"
        ),
        "isAggregate": "true",
        "isGame": "false",
        "limit": -1,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                NHL_STATS_URL,
                params=params,
            )
            response.raise_for_status()

        payload = response.json()
        players = payload["data"]

        if not isinstance(players, list) or not players:
            raise ValueError("No league statistics returned")

        return players

    except (httpx.HTTPError, ValueError, KeyError) as error:
        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve NHL league statistics",
        ) from error


async def build_percentile_data() -> dict:
    players = await fetch_league_stats()

    eligible_players = [
        player
        for player in players
        if player.get("gamesPlayed", 0) >= MIN_GAMES
        and all(
            isinstance(player.get(field), (int, float))
            for field in STAT_FIELDS.values()
        )
    ]

    if not eligible_players:
        raise HTTPException(
            status_code=503,
            detail="No eligible players found",
        )

    player_rates = {
        int(player["playerId"]): get_player_rates(player)
        for player in eligible_players
    }

    distributions = {
        stat: [
            rates[stat]
            for rates in player_rates.values()
        ]
        for stat in STAT_FIELDS
    }

    results = {}

    for player in eligible_players:
        player_id = int(player["playerId"])
        rates = player_rates[player_id]

        percentiles = {
            stat: calculate_percentile(
                value,
                distributions[stat],
            )
            for stat, value in rates.items()
        }

        results[player_id] = {
            "playerId": player_id,
            "playerName": player["skaterFullName"],
            "gamesPlayed": player["gamesPlayed"],
            "stats": rates,
            "percentiles": percentiles,
        }

    return {
        "season": SEASON_ID,
        "gameType": 2,
        "minimumGames": MIN_GAMES,
        "playerCount": len(results),
        "players": results,
    }


async def get_cached_percentiles() -> dict:
    now = time.monotonic()

    if (
        _cache["data"] is not None
        and now < _cache["expires_at"]
    ):
        return _cache["data"]

    async with _cache_lock:
        # Check again in case another request refreshed it.
        now = time.monotonic()

        if (
            _cache["data"] is not None
            and now < _cache["expires_at"]
        ):
            return _cache["data"]

        try:
            data = await build_percentile_data()
        except Exception:
            # Serve stale data if a refresh fails.
            if _cache["data"] is not None:
                return _cache["data"]
            raise

        _cache["data"] = data
        _cache["expires_at"] = time.monotonic() + CACHE_TTL

        return data


@router.get("/league/percentiles")
async def get_league_percentiles():
    return await get_cached_percentiles()


@router.get("/players/{player_id}/percentiles")
async def get_player_percentiles(player_id: int):
    league = await get_cached_percentiles()

    player = league["players"].get(player_id)

    if player is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "Player not found in eligible 2026-27 "
                "regular-season skaters"
            ),
        )

    return {
        "season": league["season"],
        "minimumGames": league["minimumGames"],
        "comparisonPlayerCount": league["playerCount"],
        **player,
    }
