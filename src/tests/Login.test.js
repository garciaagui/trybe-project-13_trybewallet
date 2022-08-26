import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const defaultEmail = 'test@test.com';
const defaultPassword = 'xxxxxx';

it('Verifica os elementos de formulário', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const inputEmail = screen.getByTestId(/email-input/i);
  const inputPassword = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByRole('button', { name: /Entrar/i });

  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

it('Testa a lógica de invalidação do botão de Submit', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const inputEmail = screen.getByTestId(/email-input/i);
  const inputPassword = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(inputEmail, 'test');
  userEvent.type(inputPassword, 'xxx');
  expect(submitButton.disabled).toBeTruthy();

  userEvent.type(inputEmail, defaultEmail);
  expect(submitButton.disabled).toBeTruthy();

  userEvent.type(inputPassword, defaultPassword);
  expect(submitButton.disabled).toBeFalsy();
});

it('Testa se a tela é redirecionada para "/carteira"', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const inputEmail = screen.getByTestId(/email-input/i);
  const inputPassword = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(inputEmail, defaultEmail);
  userEvent.type(inputPassword, defaultPassword);
  userEvent.click(submitButton);

  const { pathname } = history.location;
  expect(pathname).toBe('/carteira');
});

it('Testa se o estado global "email" é atualizado ao redirecionar', () => {
  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const inputEmail = screen.getByTestId(/email-input/i);
  const inputPassword = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(inputEmail, defaultEmail);
  userEvent.type(inputPassword, defaultPassword);
  userEvent.click(submitButton);

  const { user: { email } } = store.getState();
  const expected = defaultEmail;

  expect(email).toBe(expected);
});
