import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../../../context';
import styles from './Topbar.module.css';
import Button from '@mui/material/Button';

const Topbar = () => {
  const { setters } = useContext(Context);
  const navigate = useNavigate();

  function logout () {
    localStorage.removeItem('token');
    console.log('the token removed from the localstorage')
    setters.setGToken(null);
    navigate('/');
  }

  return (
    <nav className={styles.pageWrapper}>
      <div className={styles.leftContainer}>
        <Button variant='contained' onClick={() => navigate('/dashboard')}>to dashboard</Button>
      </div>
      <div className={styles.rightContainer}>
        <Button variant="contained" onClick ={ logout }>Logout</Button>
      </div>
    </nav>
  )
}

export default Topbar;
