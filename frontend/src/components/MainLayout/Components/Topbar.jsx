import React from 'react';
import {
  Link
} from 'react-router-dom';
import { useContext, Context } from '../../../context';
import './Topbar.css'
import Button from '@mui/material/Button';

const Topbar = () => {
  const { getters, setters } = useContext(Context);

  function logout () {
    localStorage.removeItem('token');
    console.log('the token removed from the localstorage')
    setters.setGToken(null);
  }

  return (
    <nav className='topbar'>
      {getters.gToken !== null
        ? <>
          {/* <button onClick={ logout }>Logout Button</button> */}
          <Link id="logout" to="/" onClick ={ logout }>Logout</Link>
        </>
        : <>
          <Link to="/">
          <Button variant="contained">Sign In</Button>
          </Link>
          <Link id="signIn" to="/signin">
          <Button variant="contained">Sign Up</Button>
          </Link>
          <Link to="/PlayJoin">
          <Button variant="contained">Join Game</Button>
          </Link>
        </>
      }
    </nav>
  )
}

export default Topbar;
