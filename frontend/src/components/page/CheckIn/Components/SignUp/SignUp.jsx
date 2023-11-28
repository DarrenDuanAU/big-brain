import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../../../../context';
import Button from '@mui/material/Button';
import { BACKEND_PORT } from '../../../../../const';
import styles from './SignUp.module.css';

function SignUp ({
  setPage
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const { setters } = useContext(Context);
  const navigate = useNavigate();

  async function register () {
    console.log(email, password, name);
    const response = await fetch(BACKEND_PORT + '/admin/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      })
    });
    const data = await response.json();
    console.log('in SignUp.jsx: the response data is', data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setters.setGToken(data.token);
      navigate('/dashboard')
    } else {
      console.log('in SignUp.jsx: the response error is', data.error);
    }
  }
  return (
    <div className={styles.signUp}>
      <div className={styles.title}>
        <h2>Sign Up</h2>
      </div>
      <form className={styles.form}>
        <label htmlFor="email">Email: </label>
        <input id="email" value ={email} onChange ={ (e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password: </label>
        <input id="password" value ={password} onChange ={ (e) => setPassword(e.target.value)} />

        <label htmlFor="name">Name: </label>
        <input id="name" value ={name} onChange ={ (e) => setName(e.target.value)} />

        <Button className={styles.formButton} variant="contained" id="signUserUp" onClick={register}>Sign up</Button>
      </form>
      <div className={styles.taggleLink}>
        <p>Or <a onClick={() => setPage('signin')}>Sign In</a></p>
      </div>
    </div>
  )
}
export default SignUp;
