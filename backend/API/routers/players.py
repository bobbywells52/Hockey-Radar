from fastapi import APIRouter, HTTPException, Path
import httpx

router = APIRouter(prefix="/players")


@router.get("/{player_id}", status_code=200)
async def get_player_data(player_id: int = Path(gt=0)):
    url = f"https://api-web.nhle.com/v1/player/{player_id}/landing?player_id={player_id}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            print("pulling data for player", player_id)
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))