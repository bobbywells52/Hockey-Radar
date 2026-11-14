import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ParentCard from "../components/ParentCard";
import Radar from "../components/Radar";
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
        <div style={{ maxWidth: '500px' }}>
            {playerId ? (
                <ParentCard playerId={playerId} />
            ) : (
                <p>Invalid player ID</p>
            )}
        </div>
        {playerId ? (
            <Radar playerId={playerId}/>
         ) : <></>}
        </div>
    );
}

export default PlayerPage;
