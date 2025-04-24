import {useEffect, useState} from 'react';
import api from "../api.js";
import {Player} from "../Types.tsx";

function PlayerCard(){

  const [player, setPlayer] = useState <Player | null >(null);
  const playerId = 8476455;

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await api.get(`nhl/player/`, {
          params: { player_id: playerId }
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
  }, []);

  return (
    <div>
      {player ? (
        <div>
          <h2>{player.firstName.default}</h2>
            <h2>{player.lastName.default}</h2>
            <h2>{player.sweaterNumber}</h2>
            <h2>Career total goals: {player.careerTotals.regularSeason.goals}</h2>
          {/* render more player info here */}
        </div>
      ) : (
        <p>Loading player data...</p>
      )}
    </div>
  );

};

export default PlayerCard;