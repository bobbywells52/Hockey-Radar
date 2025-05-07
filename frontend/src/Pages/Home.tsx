import {players} from "../../players";
import {shuffleArray} from "../help";
import ParentCard from "../components/ParentCard";
import styles from "../App.module.css"
import PlayerSearch from "../components/PlayerSearch"

const shuffled = players.sort(() => 0.5 - Math.random());
const slicedIds = [...shuffled.slice(0, 9), 8471214, 8477492, 8471675];
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
