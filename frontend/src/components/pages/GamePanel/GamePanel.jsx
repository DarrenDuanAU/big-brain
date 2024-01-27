import React from 'react'
import PlayerAPICall from '../../apis/PlayerAPICall'
import {
  useParams
} from 'react-router-dom';

const GamePanel = () => {
  const params = useParams();

  const CheckStatus = async () => {
    await PlayerAPICall('/play/' + params.playerId + '/status', 'GET', null);
  }
  const GetQuestion = async () => {
    await PlayerAPICall('/play/' + params.playerId + '/question', 'GET', null);
  }
  const GetAnswer = async () => {
    await PlayerAPICall('/play/' + params.playerId + '/answer', 'GET', null);
  }
  return (
    <div>
      Player <br />
      <button onClick={CheckStatus}>get status</button>
      <br />
      <button onClick={GetQuestion}>get question</button>
      <br />
      <button onClick={GetAnswer}>get answer</button>
    </div>
  )
}

export default GamePanel;
