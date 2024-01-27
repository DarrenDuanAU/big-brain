import React, { useState } from 'react'
import {
  useNavigate
} from 'react-router-dom';
import PlayerAPICall from '../../apis/PlayerAPICall';

const PlayerLogin = () => {
  const [sessionId, setSessionId] = useState();
  const [playerName, setPlayerName] = useState();
  const navigate = useNavigate();

  const navigateToPlayerPanel = (sessionId, playerId) => {
    navigate('/Session/' + sessionId + '/Player/' + playerId)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await PlayerAPICall('/play/join/' + sessionId, 'POST', { name: playerName });
    console.log(data);
    navigateToPlayerPanel(sessionId, data.playerId);
  };

  // const handleJoinGame = () => {
  //   navigate('/Session/' + sessionId);
  // }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">your name:</label>
        <input type='text' id="playerName" onChange={e => setPlayerName(e.target.value)}/>
        <br/>
        <label htmlFor="sessionId">session Id:</label>
        <input type='text' id="sessionId" onChange={e => setSessionId(e.target.value)}/>
        <br/>
        <button type='submit'>join</button>
      </form>
    </div>
  )
}

export default PlayerLogin;
