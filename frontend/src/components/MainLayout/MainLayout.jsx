import React from 'react';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Dashboard';
import QuizEdit from '../QuizEdit';
import PlayJoin from '../PlayJoin';
import QuestionEdit from '../QuestionEdit';
import Result from '../Result';
import PlayGame from '../PlayGame'
import GameWelcome from '../GameWelcome'
import AdminGame from '../AdminGame';
import Topbar from './Components/Topbar'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useContext, Context } from '../../context';
// import Quiz from './Quiz';

function App () {
  const { getters, setters } = useContext(Context);

  // function logout () {
  //   localStorage.removeItem('token');
  //   console.log('the token removed from the localstorage')
  //   setters.setGToken(null);
  // }

  React.useEffect(() => {
    if (localStorage.getItem('token') && getters.gToken === null) {
      setters.setGToken(localStorage.getItem('token'));
      console.log('App.jsx: (gToken is null && localstorage(token) !== null) => set the localstorage token to gToken!!!');
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <hr />
          <Routes>
            (<Route path="/" element={ <SignUp/> } />)
            (<Route path="/Dashboard" element={ <Dashboard/> } />)
            (<Route path="/signin" element={ <SignIn/>}/>)
            (<Route path="/QuizEdit" element={ <QuizEdit />}/>)
            (<Route path="/QuizEdit/:quizId" element={ <QuizEdit/>}/>)
            (<Route path="/QuizEdit/:quizId/QuestionEdit/:questionId" element={ <QuestionEdit/>}/>)
            (<Route path="/Result/:sessionId" element={ <Result/>} />)
            (<Route path="/PlayJoin" element={<PlayJoin/>}/>)
            (<Route path="/PlayJoin/:sessionId" element={ <GameWelcome/>}/>)
            (<Route path="/PlayJoin/:sessionId/:playerId" element={ <PlayGame/>}/>)
            (<Route path="/test" element={ <Dashboard/> } />)
            (<Route path="/Quiz/:quizId/:sessionId/Admin" element={ <AdminGame/>}/>)
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
