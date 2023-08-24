import { useContext, Context } from '../context';

async function APICall (path, PaMethod, payload) {
  const { getters, setters } = useContext(Context);

  let token = getters.gToken;
  if (token === null || token === undefined) {
    token = localStorage.getItem('token');
    setters.setGToken(localStorage.getItem('token'));
  }
  console.log('APIcall: the token is:', token);
  const option = {
    method: PaMethod,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  if (payload !== null) {
    option.body = JSON.stringify(payload);
  }
  const response = await fetch('http://localhost:5005' + path, option);
  const data = await response.json();
  console.log('the response data is:', data);
  console.log('Dashboard.jsx/function createNewGame');
}
export default APICall;
