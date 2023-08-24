import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../context';

function SignIn () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { getters, setters } = useContext(Context);
  const [valid, setValid] = React.useState(true);
  const navigate = useNavigate();

  function resetAllValues () {
    setEmail('');
    setPassword('');
    setValid(true);
  }

  async function register () {
    console.log('Signin.jsx the email and password sending to backend:', email, password);
    const response = await fetch('http://localhost:5005/admin/auth/login', {
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
    console.log('Signin.jsx: the response data is', data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setters.setGToken(data.token);
      navigate('/dashboard')
      console.log('Signin.jsx:gToken is', getters.gToken);
    } else {
      console.log('Signin.jsx: the response error is', data.error);
      setValid(false);
    }
  }
  return (
    <div data-testid="testSignin">
      Email: <input id="email" value ={email} onChange ={ (e) => setEmail(e.target.value)} /><br />
      Password: <input id="password" value ={password} onChange ={ (e) => setPassword(e.target.value)} /> <br />
      <button id="signUserIn" onClick={register}>Sign In</button> <br /> <br />
      {!valid && <>
        <div>
          Not Valid input, please try again <br />
          <button onClick={resetAllValues} >clear and try again</button>
        </div>
      </>}
      {/* <Link to="/dashboard" onClick={register}>sign In</Link> */}
    </div>
  )
}
export default SignIn;
