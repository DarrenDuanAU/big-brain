import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
import Router from './components/Router';
import { Context, initialValue } from './context';

const App = () => {
  const [gToken, setGToken] = React.useState(initialValue.gToken);
  const getters = {
    gToken,
  };
  const setters = {
    setGToken,
  }

  useEffect(() => {
    if (getters.gToken === null && localStorage.getItem('token') !== null) {
      setters.setGToken(localStorage.getItem('token'));
    }
  }, [])

  return (
    <Context.Provider value={{ getters, setters, }}>
      <Router />
    </Context.Provider>
  );
};

export default App;
