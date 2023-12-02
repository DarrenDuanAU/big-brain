import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../../../../context';
import { BACKEND_PORT } from '../../../../../const';
import Button from '@mui/material/Button';
import styles from './SignIn.module.css';

function SignIn ({
  setPage,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(true);
  const { setters } = useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem('token') != null) {
  //     navigate('/dashboard')
  //   }
  // }, [])

  function resetAllValues () {
    setEmail('');
    setPassword('');
    setValid(true);
  }

  async function register () {
    console.log('Signin.jsx the email and password sending to backend:', email, password);
    const response = await fetch(BACKEND_PORT + '/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setters.setGToken(data.token);
      navigate('/dashboard')
      // console.log('Signin.jsx:gToken is', getters.gToken);
    } else {
      console.log('Signin.jsx: the response error is', data.error);
      setValid(false);
    }
  }
  return (
    <div data-testid="testSignin" className={styles.signIn}>
      <div className={styles.title}>
        <h2>Sign In</h2>
      </div>
      <form className={styles.form}>
        <label htmlFor="email"> Email: </label>
        <input id="email" value ={email} onChange ={ (e) => setEmail(e.target.value)} />

        <label htmlFor="password"> Password: </label>
        <input id="password" value ={password} onChange ={ (e) => setPassword(e.target.value)} />

        <Button className={styles.formButton} variant="contained" id="signUserIn" onClick={register}>Sign In</Button>
      </form>

      <div className={styles.taggleLink}>
        <p>Or <button className={styles.taggleButton} onClick={() => setPage('signup')}>Sign Up</button></p>
      </div>

      {!valid && <div>
          Not Valid input, please try again <br />
          <Button variant="contained" onClick={resetAllValues} >clear and try again</Button>
        </div>
      }
    </div>
  )
}
export default SignIn;
