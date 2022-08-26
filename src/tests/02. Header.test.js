import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

it('Verifica os elementos do Header', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const emailField = screen.getByTestId(/email-field/i);
  const expensesField = screen.getByTestId(/total-field/i);
  const currencyField = screen.getByTestId(/header-currency-field/i);

  expect(emailField).toBeInTheDocument();
  expect(expensesField).toBeInTheDocument();
  expect(currencyField).toBeInTheDocument();
});

it('Verifica se o valor do campo email é o mesmo do estado global', () => {
  const initialState = {
    user: {
      email: 'test@test.com',
    },
  };

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

  const { user: { email } } = store.getState();
  const emailField = screen.getByTestId(/email-field/i);

  expect(emailField).toHaveTextContent(email);
});
