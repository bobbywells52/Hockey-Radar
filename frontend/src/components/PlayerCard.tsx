import {useEffect, useState} from 'react';
import api from "../api.js";
import {Player} from "../Types.tsx";
import styles from "./  PlayerCard.module.css"
import FrontCard from "./FrontCard.tsx";


interface PlayerCardProps {
    playerId: number | null;
}

function PlayerCard({playerId}: PlayerCardProps) {
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
            {player ? (showFront ? (
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
                        <p className={styles.number}>#{player.sweaterNumber}</p>
                        <button className={styles.flipButton} onClick={handleClick}>Flip Card</button>

                    </div>) : (
                    <div className={styles.cardBack}>
                        <h3>Career Stats</h3>
                        <ul>
                            <li><span className="stat-label">Position:</span> <span
                                className="stat-value">{player.position}</span></li>
                            <li><span className="stat-label">Games:</span> <span
                                className="stat-value">{player.careerTotals.regularSeason.gamesPlayed}</span></li>
                            <li><span className="stat-label">Goals:</span> <span
                                className="stat-value">{player.careerTotals.regularSeason.goals}</span></li>
                            <li><span className="stat-label">Assists:</span> <span
                                className="stat-value">{player.careerTotals.regularSeason.assists}</span></li>
                            <li><span className="stat-label">Points:</span> <span
                                className="stat-value">{player.careerTotals.regularSeason.points}</span></li>
                        </ul>
                        {player.awards.some((award) => award.trophy.default === 'Stanley Cup') && (
                            <span className={styles.cupIcon}>🏆</span>
                        )}

                        <button className={styles.flipButton} onClick={handleClick}>Flip Card</button>

                    </div>
                )

            ) : (
                <p> Loading Card... </p>
            )}
        </div>
    );
}

export default PlayerCard;