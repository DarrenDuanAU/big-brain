import React, { createContext } from 'react';
// import { createContext } from 'react';

export const initialValue = {
  gToken: null,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;
