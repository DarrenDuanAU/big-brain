import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useContext, Context } from '../../context';

function SignUp () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setters } = useContext(Context);
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  async function register () {
    console.log(email, password, name);
    const response = await fetch('http://localhost:5005/admin/auth/register', {
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
    <>
      Email: <input id="email" value ={email} onChange ={ (e) => setEmail(e.target.value)} /><br />
      Password: <input id="password" value ={password} onChange ={ (e) => setPassword(e.target.value)} /> <br />
      Name: <input id="name" value ={name} onChange ={ (e) => setName(e.target.value)} /> <br />
      <button id="signUserUp" onClick={register}>Sign up</button>
    </>
  )
}
export default SignUp;
