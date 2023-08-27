import React from 'react';
import {
  Link
} from 'react-router-dom';
import { useContext, Context } from '../../../../context';
import styles from './Topbar.module.css';
import Button from '@mui/material/Button';

const Topbar = () => {
  const { setters } = useContext(Context);

  function logout () {
    localStorage.removeItem('token');
    console.log('the token removed from the localstorage')
    setters.setGToken(null);
  }

  return (
    <nav className={styles.container}>
      <Link id="logout" to="/" onClick ={ logout }>
        <div className={styles.buttons}>
          <Button variant="contained">Logout</Button>
        </div>
      </Link>
    </nav>
  )
}

export default Topbar;
