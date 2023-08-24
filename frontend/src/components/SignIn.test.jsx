import React from 'react';
import {render, screen} from '@testing-library/react';
import SignIn from './SignIn';
import { BrowserRouter } from 'react-router-dom';

test("sign user in button", () => {
  render(
  <BrowserRouter>
    <SignIn />
  </BrowserRouter>
  );
  const signInElement = screen.getByTestId('testSignin');
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(signInElement).toBeInTheDocument();
  expect(signInElement).toHaveTextContent('Email:');
  expect(signInElement).toHaveTextContent('Password:');
  expect(signInElement).toContainHTML('<input value=""/>');
});
