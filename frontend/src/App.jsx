import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
import MainPage from './components/MainLayout/MainLayout';
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
      <MainPage />
    </Context.Provider>
  );
};

export default App;
