import './App.css'
import {useState} from "react";
import PlayerCard from "./components/PlayerCard.tsx";
import styles from './App.module.css';


const playerIds = [
    8471214, // Ovechkin
    8477492, // MacKinnon
    8471675, // Crosby
    8478402,
    8477934,
    8470600,
    8477940,
    8479318,
    8480800,
];


function App() {


    //const [id, setId] = useState<number | null>(0);
//     return (
//         <>
//             <div>
//                 <input
//                     type={'number'}
//                     placeholder={"playerID"}
//                     value={id}
//                     onChange={(e) => setId(Number(e.target.value))}
//                 />
//                 <PlayerCard playerId={id}></PlayerCard>
//             </div>
//         </>
//     )
// }

    return (
        <div className={styles.gridContainer}>
            {playerIds.map((id) => (
                <PlayerCard key={id} playerId={id}/>
            ))}
        </div>
    );
}

export default App
