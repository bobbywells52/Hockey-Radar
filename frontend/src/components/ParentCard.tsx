import {useEffect, useState} from "react";
import {Player} from "../Types.tsx";
import api from "../api.tsx";
import FrontendCard from "./FrontCard";
import BackCard from "./BackCard.tsx";

interface ParentCardProps {
    playerId: number | null;
}

function ParentCard(playerId: ParentCardProps) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [showFront, setShowFront] = useState<boolean>(true);


    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await api.get(`/players/${playerId.playerId}`);
                setPlayer(response.data);
                console.log("Fetching data for player")
                console.log(playerId)
            } catch (error) {
                // @ts-ignore
                console.error('Error fetching player data:', error.message);
                console.log(playerId)
            }
        };

        if (playerId) {
            fetchPlayer();
        }
    }, [playerId]);

    let props = {player: player, showFront: showFront, setShowFront: setShowFront};

    return (
        <div>
            {showFront ? (<FrontendCard {...props} />) : <BackCard {...props}/>}

        </div>)
}


export default ParentCard;