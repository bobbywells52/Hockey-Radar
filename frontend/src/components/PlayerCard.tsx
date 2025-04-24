import {useEffect, useState} from 'react';
import api from "../api.js";
import {Player} from "../Types.tsx";
import styles from "./  PlayerCard.module.css"

interface PlayerCardProps{
    playerId: number;
}

function PlayerCard({playerId}:PlayerCardProps){
  const [player, setPlayer] = useState <Player | null >(null);
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await api.get(`nhl/player/`, {
          params: {player_id: playerId}
        });
        setPlayer(response.data);
        console.log(typeof response.data.firstName)
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
  <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
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
      <p className={styles.number}>#{player.sweaterNumber}</p>
      <p className={styles.goals}>
        <strong>Career Goals:</strong> {player.careerTotals.regularSeason.goals}
      </p>
    </div>
    ) : (
      <p>Loading player data...</p>
    )}
  </div>
);
};

export default PlayerCard;