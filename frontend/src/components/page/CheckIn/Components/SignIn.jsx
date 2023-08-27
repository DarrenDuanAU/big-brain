import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../../../context';
import { BACKEND_PORT } from '../../../../const';
import Button from '@mui/material/Button';
import './SignIn.css';

function SignIn () {
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
    <div data-testid="testSignin" className='signin'>
      <label htmlFor="email"> Email: </label>
      <input id="email" value ={email} onChange ={ (e) => setEmail(e.target.value)} /><br />

      <label htmlFor="password"> Password: </label>
      <input id="password" value ={password} onChange ={ (e) => setPassword(e.target.value)} /> <br />

      <Button variant="contained" id="signUserIn" onClick={register}>Sign In</Button> <br /> <br />

      {!valid && <div className='popup'>
          Not Valid input, please try again <br />
          <Button variant="contained" onClick={resetAllValues} >clear and try again</Button>
        </div>
      }
    </div>
  )
}
export default SignIn;
