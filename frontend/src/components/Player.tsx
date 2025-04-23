import React, { useEffect, useState } from 'react';
import api from "../api.js";

const Player = () => {

   const [player, setPlayer] = useState([]);

  const getPlayerData = async (playerId: number) => {
  try {
    const response = await api.get(`/player/${playerId}/landing`, {
      params: { player_id: playerId }
    });
    console.log('Player data:', response.data);
    setPlayer(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching player data:', error.message);
    throw error;
  }
};





  useEffect(() => {
    getPlayerData(8471675);
  }, []);

  return (
    <div>
      <h2>Players List</h2>
      <ul>
      </ul>
    </div>
  );
};

export default Player;