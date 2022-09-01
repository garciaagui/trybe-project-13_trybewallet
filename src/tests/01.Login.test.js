import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const defaultEmail = 'test@test.com';
const defaultPassword = 'xxxxxx';

it('Should have 02 inputs and 01 button', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  expect(screen.getByTestId(/email-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/password-input/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
});

it('Tests the submit button validation logic', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const emailInput = screen.getByTestId(/email-input/i);
  const passwordInput = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(emailInput, 'test');
  userEvent.type(passwordInput, 'xxx');
  expect(submitButton.disabled).toBeTruthy();

  userEvent.type(emailInput, defaultEmail);
  expect(submitButton.disabled).toBeTruthy();

  userEvent.type(passwordInput, defaultPassword);
  expect(submitButton.disabled).toBeFalsy();
});

it('Tests page redirect to "/wallet" after clicking submit button', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  userEvent.type(screen.getByTestId(/email-input/i), defaultEmail);
  userEvent.type(screen.getByTestId(/password-input/i), defaultPassword);
  userEvent.click(screen.getByRole('button', { name: /Entrar/i }));

  const { pathname } = history.location;
  expect(pathname).toBe('/carteira');
});

it('Tests "email" state update when the page is redirected', () => {
  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  userEvent.type(screen.getByTestId(/email-input/i), defaultEmail);
  userEvent.type(screen.getByTestId(/password-input/i), defaultPassword);
  expect(store.getState().user.email).toBe('');

  userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
  expect(store.getState().user.email).toBe(defaultEmail);
});
