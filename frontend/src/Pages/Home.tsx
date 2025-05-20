import {players} from "../../players";
import {shuffleArray} from "../help";
import ParentCard from "../components/ParentCard";
import styles from "../App.module.css"
import PlayerSearch from "../components/PlayerSearch"

const currentStars = shuffleArray([8471214, 8477492, 8471675, 8478402, 8477934, 8480069]);
const activePlayers = players.sort(() => 0.5 - Math.random());
const slicedIds = [...activePlayers.slice(0, 9), ...currentStars.slice(0,3)];
const playerIds = shuffleArray(slicedIds);

function Home() {
    return (
        <div>
            <PlayerSearch/>
            <div className={styles.gridContainer}>
                {playerIds.map((id: number) => (
                    <ParentCard key={id} playerId={id}/>
                ))}
            </div>
        </div>
    );
}

export default Home;
