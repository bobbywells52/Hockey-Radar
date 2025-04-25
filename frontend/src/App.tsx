import './App.css'
import PlayerCard from "./components/PlayerCard.tsx";
import styles from './App.module.css';
import {players} from "../players.tsx";
import {shuffleArray} from "./help.ts";

  const shuffled = players.sort(() => 0.5 - Math.random()); // Shuffle the array
  const slicedIds = shuffled.slice(0, 6);

  slicedIds.push(8471214,8477492,8471675)


const playerIds =shuffleArray(slicedIds)



function App() {
    return (
        <div className={styles.gridContainer}>
            {playerIds.map((id) => (
                <PlayerCard key={id} playerId={id}/>
            ))}
        </div>
    );
}

export default App
