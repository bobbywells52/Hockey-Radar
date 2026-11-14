
import { ResponsiveRadar } from "@nivo/radar";
import { useEffect, useState } from "react";
import api from "../api";
import type { Player, Stats } from "../Types";

type RadarDataPoint = {
	stat: string;
	[key: string]: string | number;
};

type RadarProps = {
	playerId: number | null;
};

function Radar({ playerId }: RadarProps) {
	const [player, setPlayer] = useState<Player | null>(null);

	useEffect(() => {
		if (!playerId) return;

		const fetchPlayer = async () => {
			try {
				const response = await api.get(`/players/${playerId}`);
				setPlayer(response.data);
			} catch (error) {
				console.error("Error fetching player data:", error);
			}
		};

		fetchPlayer();
	}, [playerId]);

	if (!player) {
		return <p>Loading player statistics...</p>;
	}

	const stats: Stats = player.careerTotals.regularSeason;
	const playerName = `${player.firstName.default} ${player.lastName.default}`;
	const gamesPlayed = stats.gamesPlayed;

	if (gamesPlayed === 0) {
		return <p>No player statistics available.</p>;
	}

	const data: RadarDataPoint[] = [
		{
			stat: "Goals per game",
			[playerName]: Number((stats.goals / gamesPlayed).toFixed(2)),
		},
		{
			stat: "Assists per game",
			[playerName]: Number((stats.assists / gamesPlayed).toFixed(2)),
		},
		{
			stat: "Points per game",
			[playerName]: Number((stats.points / gamesPlayed).toFixed(2)),
		},
		{
			stat: "Power Play Goals per game",
			[playerName]: Number((stats.powerPlayGoals / gamesPlayed).toFixed(2)),
		},
		{
			stat: "Game Winning Goals per game",
			[playerName]: Number((stats.gameWinningGoals / gamesPlayed).toFixed(2)),
		},
	];

	return (
		<ResponsiveRadar
			data={data}
			keys={[playerName]}
			indexBy="stat"
			margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
			gridLabelOffset={36}
			dotSize={10}
			dotColor={{ theme: "background" }}
			dotBorderWidth={2}
			colors={{ scheme: "red_blue" }}
			blendMode="multiply"
		/>
	);
}

export default Radar;
