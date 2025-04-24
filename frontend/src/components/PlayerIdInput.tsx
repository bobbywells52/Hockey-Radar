import React, { useState } from 'react';

type PlayerIdInputProps = {
  onSubmit: (playerId: number) => void;
};

const PlayerIdInput: React.FC<PlayerIdInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = parseInt(inputValue, 10);
    if (!isNaN(parsedId)) {
      onSubmit(parsedId);
    } else {
      alert('Please enter a valid number');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Enter Player ID:&nbsp;
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. 8476455"
        />
      </label>
      <button type="submit" style={{ marginLeft: '0.5rem' }}>
        Submit
      </button>
    </form>
  );
};

export default PlayerIdInput;
