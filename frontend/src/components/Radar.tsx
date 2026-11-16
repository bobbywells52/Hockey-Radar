
import { ResponsiveRadar } from "@nivo/radar";
import { useEffect, useState } from "react";
import api from "../api";
import type { PlayerPercentiles } from "../Types";

type RadarProps = {
	playerId: number | null;
};

type RadarDataPoint = {
	stat: string;
	[key: string]: string | number;
};

const RADAR_STATS = [
	{ key: "goals", label: "Goals" },
	{ key: "assists", label: "Assists" },
	{ key: "points", label: "Points" },
	{ key: "powerPlayGoals", label: "Power Play Goals" },
	{ key: "shots", label: "Shots" },
] as const;

function Radar({ playerId }: RadarProps) {
	const [playerPercentiles, setPlayerPercentiles] =
		useState<PlayerPercentiles | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (playerId === null) return;

		let cancelled = false;

		const fetchPercentiles = async () => {
			setPlayerPercentiles(null);
			setError(null);

			try {
				const { data } = await api.get<PlayerPercentiles>(
					`/players/${playerId}/percentiles`
				);

				if (!cancelled) setPlayerPercentiles(data);
			} catch (error) {
				console.error("Error fetching player percentiles:", error);

				if (!cancelled) {
					setError("Unable to load player percentiles.");
				}
			}
		};

		fetchPercentiles();

		return () => {
			cancelled = true;
		};
	}, [playerId]);

	if (playerId === null) return null;

	if (error) return <p>{error}</p>;

	if (!playerPercentiles || playerPercentiles.playerId !== playerId) {
		return <p>Loading player percentiles...</p>;
	}

	const {
		playerName,
		percentiles,
		comparisonPlayerCount,
		minimumGames,
	} = playerPercentiles;

	const data: RadarDataPoint[] = RADAR_STATS.map(({ key, label }) => ({
	stat: label,
	Percentile: percentiles[key],
}));

	
return (
	<div style={{ width: "100%", height: "550px" }}>
        <h2
        style={{
            fontFamily: '"Roboto Slab", Georgia, serif',
            fontWeight: 700,
            fontSize: "1.75rem",
            textAlign: "center",
            marginBottom: "0.5rem",
        }}
    >
        {playerName} — Performance Percentiles
    </h2>
        <p
            style={{
                fontFamily: '"Roboto Slab", Georgia, serif',
                fontWeight: 400,
                fontSize: "0.9rem",
                textAlign: "center",
                color: "#666",
            }}
        >
            Per-game stats · 2026-27 season · Compared with{" "}
            {comparisonPlayerCount} NHL skaters ({minimumGames}+ games played)
        </p>
		<div style={{ height: "450px" }}>
			<ResponsiveRadar
				data={data}
				keys={["Percentile"]}
				indexBy="stat"
				maxValue={100}
				margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
				gridLabelOffset={36}
				dotSize={10}
				dotColor={{ theme: "background" }}
				dotBorderWidth={2}
				colors={{ scheme: "red_blue" }}
				blendMode="multiply"
				sliceTooltip={({ index, data }) => {
					const value = Number(data[0].value);

					const suffix =
						value % 100 >= 11 && value % 100 <= 13
							? "th"
							: value % 10 === 1
								? "st"
								: value % 10 === 2
									? "nd"
									: value % 10 === 3
										? "rd"
										: "th";

					return (
						<div
							style={{
								background: "white",
								padding: "10px 14px",
								borderRadius: "6px",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
								fontSize: "14px",
								color: "#222",
							}}
						>
							<strong>{index}:</strong> {value}
							{suffix} Percentile
						</div>
					);
				}}
			/>
		</div>
	</div>
);

}

export default Radar;
