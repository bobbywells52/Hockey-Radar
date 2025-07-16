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


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (query) {
                navigate(`/player/${getPlayerIdByName(query)}`);
            } else {
                setError("Player not found.");
            }
        } catch (err) {
            console.log(getPlayerIdByName(query))
            setError("Error searching for player.");
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Search for an active NHL player</h1>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter full name or NHL API id..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.button}>SEARCH</button>
                </form>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
}

export default PlayerSearch;
