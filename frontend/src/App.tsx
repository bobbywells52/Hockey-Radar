import './App.css';
import styles from './App.module.css';
import { players } from "../players.tsx";
import { shuffleArray } from "./help.ts";
import ParentCard from "./components/ParentCard.tsx";
import NavBar from "./components/NavBar.tsx";

const shuffled = players.sort(() => 0.5 - Math.random());
const slicedIds = shuffled.slice(0, 6);
slicedIds.push(8471214, 8477492, 8471675);
const playerIds = shuffleArray(slicedIds);

function App() {
    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.gridContainer}>
                {playerIds.map((id: number) => (
                    <ParentCard key={id} playerId={id} />
                ))}
            </main>
        </div>
    );
}

export default App;
