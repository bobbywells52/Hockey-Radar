import { ResponsiveRadar } from "@nivo/radar";
import type { Stats } from "../types";

type RadarDataPoint = {
	stat: string;
	[key: string]: string | number;
};

type RadarProps = {
	stats: Stats;
	playerName: string;
};

function Radar({ stats, playerName }: RadarProps) {
	const data: RadarDataPoint[] = [
		{ stat: "Goals", [playerName]: stats.goals },
		{ stat: "Assists", [playerName]: stats.assists },
		{ stat: "Points", [playerName]: stats.points },
		{ stat: "Shots", [playerName]: stats.shots },
		{ stat: "PIM", [playerName]: stats.pim },
		{ stat: "Plus/Minus", [playerName]: stats.plusMinus },
		{ stat: "Power Play Goals", [playerName]: stats.powerPlayGoals },
		{ stat: "Game Winning Goals", [playerName]: stats.gameWinningGoals },
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
			blendMode="multiply"
			legends={[
				{
					anchor: "top-left",
					direction: "column",
					translateX: -50,
					translateY: -40,
					itemWidth: 80,
					itemHeight: 20,
					symbolShape: "circle",
				},
			]}
		/>
	);
}

export default Radar;