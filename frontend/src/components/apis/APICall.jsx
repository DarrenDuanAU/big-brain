import { BACKEND_PORT } from '../../const';

async function APICall (path, method, payload) {
  const token = localStorage.getItem('token');
  const option = {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  if (payload !== null) {
    option.body = JSON.stringify(payload);
  }
  const response = await fetch(BACKEND_PORT + path, option);
  const data = await response.json();
  console.log('APICall.jsx : the response data is:', data);
  return data;
}
export default APICall;
