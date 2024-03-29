import React from 'react';
import CheckIn from './pages/CheckIn/CheckIn';
import Dashboard from './pages/Dashboard/Dashboard';
import QuizEdit from './pages/QuizEdit/QuizEdit';
import GamePanel from './pages/GamePanel';
// import PlayJoin from './PlayJoin';
// import QuestionEdit from './QuestionEdit';
// import Result from './Result';
// import PlayGame from './PlayGame'
// import GameWelcome from './GameWelcome'
// import AdminGame from './AdminGame';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import { useContext, Context } from '../context';
import PlayerLogin from './pages/PlayerLogin';
// import Topbar from './page/shared/Topbar/Topbar';
// import Quiz from './Quiz';

function Router () {
  // const { getters, setters } = useContext(Context);

  // function logout () {
  //   localStorage.removeItem('token');
  //   console.log('the token removed from the localstorage')
  //   setters.setGToken(null);
  // }

  // React.useEffect(() => {
  //   if (localStorage.getItem('token') && getters.gToken === null) {
  //     setters.setGToken(localStorage.getItem('token'));
  //     console.log('Router.jsx: (gToken is null && localstorage(token) !== null) => set the localstorage token to gToken!!!');
  //   }
  // }, []);

  return (
    <div className='mainlayout'>
      <BrowserRouter>
        <Routes>
            (<Route path="/" element={ <CheckIn/>}/>)
            (<Route path="/Dashboard" element={ <Dashboard/> } />)
            {/* (<Route path="/QuizEdit" element={ <QuizEdit />}/>) */}
            (<Route path="/QuizEdit/:quizId" element={ <QuizEdit/>}/>)
            {/* (<Route path="/QuizEdit/:quizId/QuestionEdit/:questionId" element={ <QuestionEdit/>}/>) */}
            (<Route path="/player-login" element={<PlayerLogin />}/>)
            (<Route path="/Session/:sessionId/Player/:playerId" element={<GamePanel/>}/>)

            {/* (<Route path="/PlayJoin" element={<PlayJoin/>}/>)
            (<Route path="/PlayJoin/:sessionId" element={ <GameWelcome/>}/>)
            (<Route path="/PlayJoin/:sessionId/:playerId" element={ <PlayGame/>}/>)
            (<Route path="/Result/:sessionId" element={ <Result/>} />)
            (<Route path="/test" element={ <Dashboard/> } />)
            (<Route path="/Quiz/:quizId/:sessionId/Admin" element={ <AdminGame/>}/>) */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Router;
