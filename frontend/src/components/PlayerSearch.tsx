import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./PlayerSearch.module.css";
import Players from "../../../Players.json";

function getPlayerIdByName(name: string) {
    const player = Players.find(
        p => p["Player Name"].toLowerCase() === name.toLowerCase());
    return player ? player["Player ID"] : null;
}

function PlayerSearch() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <div className={styles.searchContainer}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Search for an active NHL player</h1>
                    <div className={styles.searchInputs}>
                         <input
                           className={styles.input}
                           type="text"
                           placeholder="Enter Player Name"
                            />
                            <button type="submit" className={styles.button}>SEARCH</button>
                    </div>
                    <div className={styles.searchResult}>
                        {Players.map((value, key) => {
                            return <div> {value.playerName} </div>})}
                    </div>

            </div>
        </div>
    );
}

export default PlayerSearch;
