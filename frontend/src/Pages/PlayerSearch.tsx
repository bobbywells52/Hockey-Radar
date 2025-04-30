import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PlayerSearch.module.css";

function PlayerSearch() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (query) {
                navigate(`/player/${query}`);
            } else {
                setError("Player not found.");
            }
        } catch (err) {
            setError("Error searching for player.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Search for an NHL Player</h1>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter player ID or name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

export default PlayerSearch;
