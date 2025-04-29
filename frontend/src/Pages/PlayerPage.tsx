import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ParentCard from "../components/ParentCard";

function PlayerPage() {
    const { id } = useParams<{ id: string }>();
    const [playerId, setPlayerId] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) setPlayerId(parsedId);
        }
    }, [id]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Player Details</h1>
            {playerId ? (
                <ParentCard playerId={playerId} />
            ) : (
                <p>Invalid player ID</p>
            )}
        </div>
    );
}

export default PlayerPage;
