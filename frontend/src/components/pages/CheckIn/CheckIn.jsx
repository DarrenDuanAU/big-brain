import React, { useState } from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import styles from './CheckIn.module.css';

function CheckIn () {
  const [page, setPage] = useState('signin')
  return (
    <div className={styles.checkIn}>
      { page === 'signin'
        ? <SignIn setPage={setPage}/>
        : <SignUp setPage={setPage}/>}
    </div>
  )
}
export default CheckIn;
