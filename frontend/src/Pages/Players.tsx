import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Players() {
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
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
                type="text"
                placeholder="Search player..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", fontSize: "1rem" }}
            />
            <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>Search</button>
            {error && <span style={{ color: "red", marginLeft: "1rem" }}>{error}</span>}
        </form>
    );
}

export default Players;
