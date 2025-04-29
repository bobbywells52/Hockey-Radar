import './App.css'
import styles from './App.module.css';
import {players} from "../players.tsx";
import {shuffleArray} from "./help.ts";
import ParentCard from "./components/ParentCard.tsx";

  const shuffled = players.sort(() => 0.5 - Math.random()); // Shuffle the array
  const slicedIds = shuffled.slice(0, 6);

  slicedIds.push(8471214,8477492,8471675)


const playerIds =shuffleArray(slicedIds)

function App() {
    return (
        <div className={styles.gridContainer}>
            {playerIds.map((id:number) => (
                <ParentCard key={id} playerId={id}/>
            ))}
        </div>
    );
}

export default App
