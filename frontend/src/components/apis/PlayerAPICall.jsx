const PlayerAPICall = async (path, method, payload) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json', // 设置请求头为 JSON
    },
  };
  if (payload !== null) {
    options.body = JSON.stringify(payload)
  }
  try {
    const response = await fetch(path, options);
    const data = await response.json();

    if (data) {
      console.log('PlayerAPICall.jsx: the response data is:', data);
      return data;
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}
export default PlayerAPICall;
