import React, { useState } from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import './CheckIn.css';

function CheckIn () {
  const [page, setPage] = useState('signin')
  return (
    <div className='checkin'>
      <div className='container'>
        { page === 'signin'
          ? <>
            <h2>Sign In</h2>
            <SignIn />
            <div className='bottom-box'>
              <p>Or <a onClick={() => setPage('signup')}>Sign Up</a></p>
            </div>
          </>

          : <>
            <h2>Sign Up</h2>
            <SignUp />
            <div className='bottom-box'>
              <p>Or <a onClick={() => setPage('signin')}>Sign In</a></p>
            </div>
          </>}
      </div>
    </div>
  )
}
export default CheckIn;
