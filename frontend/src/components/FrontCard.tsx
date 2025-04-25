import {useEffect, useState} from 'react';
import api from "../api.js";
import {Player} from "../Types.tsx";
import styles from "./  PlayerCard.module.css"

interface FrontCardProps {
    playerId: number | null;
}

function PlayerCard({playerId}: FrontCardProps) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [showFront, setShowFront] = useState<boolean>(true);

    const handleClick = () => {
        setShowFront(!showFront)
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await api.get(`nhl/player/`, {
                    params: {player_id: playerId}
                });
                setPlayer(response.data);
                console.log(player?.teamLogo)
            } catch (error) {
                // @ts-ignore
                console.error('Error fetching player data:', error.message);
            }
        };

        if (playerId) {
            fetchPlayer();
        }
    }, [playerId]);
    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
            {player ? (
                    <div className={styles.card}>
                        <img
                            src={player.headshot}
                            alt={`${player.firstName.default} ${player.lastName.default} headshot`}
                            className={styles.headshot}
                        />
                        <h2 className={styles.name}>
                            {player.firstName.default} {player.lastName.default}
                        </h2>
                        <img
                            src={player.teamLogo}
                            alt={`${player.teamCommonName.default}`}
                            className={styles.logo}
                        />
                        <h3 className={styles.team}>{player.teamPlaceNameWithPreposition.default} {player.teamCommonName.default}</h3>
                        <p className={styles.number}>#{player.sweaterNumber}</p><button onClick={handleClick}>Flip Card</button>
                    </div>)


             : (
                <p> Please enter a player ID... </p>
            )}
        </div>
    );
}

export default PlayerCard;