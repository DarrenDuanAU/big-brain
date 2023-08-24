import React, { useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import { useContext, Context } from '../context';
import { v4 } from 'uuid'

function AdminGame () {
  const params = useParams();
  const { getters, setters } = useContext(Context);
  const [questionPosition, setQuestionPosition] = React.useState(-2);
  const [session, setSession] = React.useState([]);
  // const [resultPop, setResultPop] = React.useState(false);
  const [sessionResult, setSessionResult] = React.useState(null);

  async function stopSession () {
    const jump = (session.results.questions.length - questionPosition);
    for (let i = 0; i < jump; i++) {
      await nextQuestion();
    }
  }

  async function nextQuestion () {
    let token = getters.gToken;
    if (token === null || token === undefined) {
      token = localStorage.getItem('token');
      setters.setGToken(localStorage.getItem('token'));
    }
    // console.log('Dashboard.jsx/createNewGame: the token is:', token);
    const response = await fetch('http://localhost:5005/admin/quiz/' + params.quizId + '/advance', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    console.log('data.stage', data.stage)
    console.log('numberOfQuestions', session.results.questions.length)
    if (data.stage !== undefined && data.stage <= session.results.questions.length) {
      setQuestionPosition(data.stage);
      if (data.stage === session.results.questions.length) {
        // setResultPop(true);
        getSessionResult();
      }
    }
  }

  async function getSessionResult () {
    let token = getters.gToken;
    if (token === null || token === undefined) {
      token = localStorage.getItem('token');
      setters.setGToken(localStorage.getItem('token'));
    }
    // console.log('QuizEdit.jsx/fetchQuiz: the token is:', token);
    const response = await fetch('http://localhost:5005/admin/session/' + params.sessionId + '/results', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    console.log('getSessionResult:', data)
    setSessionResult(data);
    // return data;
    // return data.results.position;
  }

  async function getSessionStatus () {
    let token = getters.gToken;
    if (token === null || token === undefined) {
      token = localStorage.getItem('token');
      setters.setGToken(localStorage.getItem('token'));
    }
    // console.log('QuizEdit.jsx/fetchQuiz: the token is:', token);
    const response = await fetch('http://localhost:5005/admin/session/' + params.sessionId + '/status', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    console.log('getSessionStatus:', data)
    setSession(data);
    return data.results.position;
  }

  useEffect(async () => {
    const realQuestionPosition = await getSessionStatus();
    if (questionPosition === -2) {
      setQuestionPosition(realQuestionPosition);
    }
  }, [])

  return (
    <>
      quizId: {params.quizId} <br />
      sessionId: {params.sessionId} <br />
      <button onClick={nextQuestion}>{questionPosition === -1 ? 'start game' : 'next question'}</button>&nbsp;
      <button onClick={stopSession}>Stop this session</button> <br /> <hr />
      {/* <button onClick={getSessionStatus}>get session status</button>&nbsp;
      <button onClick={getSessionResult}>get session result</button> <br /> <hr /> */}
      {/* Quiz questions: <br /> <hr />
      {session?.results?.questions?.map((question) => (
        <span id={v4()} key={question.id}>
          question Id: {question.id} <br />
          question type: {question.type} <br />
          question: {question.str} <br />
          <hr />
        </span>
      ))} */}
      {questionPosition === -1 &&
      <>
        please press button to start the game
      </>
      }
      {questionPosition >= 0 && questionPosition < session?.results?.questions?.length &&
      <>
        id: {session?.results?.questions[questionPosition].id} <br />
        time limit(s): {session?.results?.questions[questionPosition].time} <br />
        question: {session?.results?.questions[questionPosition].str} <br />
        {session?.results?.questions[questionPosition].choice?.map((choice) => (
              <>
              <li id={v4()} key={choice.id}>
              {/* choice Id: {choice.id}
              &nbsp;|&nbsp; */}
              {choice.str}
              {/* &nbsp;|&nbsp;
              {choice.check ? 'true' : 'false'} <br /> */}
              </li>
              </>
        ))}
      </>}
      {questionPosition === session?.results?.questions?.length && sessionResult !== null &&
      <>
        finished...... <br />
        {sessionResult?.results?.map((player) => (
          <>
          player: {player.name} <br />
          number of questions: {player.answers.length} <br />
          result list: <br />
          {player?.answers.map((answer) => (
            <>
              <li>
                {answer.correct === true ? <>true</> : <>false</>} <br />
              </li>
            </>
          ))}
          -----------------------------------
          </>
        ))}
      </>

      }
      {/* {questionPosition} */}
      {/* {quiz.questions[questionPosition].id} */}
    </>
  )
}
export default AdminGame;
