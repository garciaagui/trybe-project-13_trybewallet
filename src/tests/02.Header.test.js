import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

it('Should have 03 fields', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  expect(screen.getByTestId(/email-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/total-field/i)).toBeInTheDocument();
  expect(screen.getByTestId(/header-currency-field/i)).toBeInTheDocument();
});

it('"Email" field content should match the "email" state', () => {
  const initialState = { user: { email: 'test@test.com' } };

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
  const { user: { email } } = store.getState();

  expect(screen.getByTestId(/email-field/i)).toHaveTextContent(email);
});

it('"Currency" field content should have "BRL"', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  expect(screen.getByTestId(/header-currency-field/i)).toHaveTextContent('BRL');
});

it('"Total" field content should be updated when an expense is ADDED and DELETED', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const currencyOptions = await screen.findAllByTestId(/option-currency/i);
  const oldTotalField = screen.getByTestId(/total-field/i);

  expect(oldTotalField).toHaveTextContent('0.00');
  const oldValue = Number(oldTotalField.innerHTML);

  expect(global.fetch).toBeCalledTimes(1);

  userEvent.type(screen.getByTestId(/value-input/i), '50');
  userEvent.type(screen.getByTestId(/description-input/i), 'Cinema');
  userEvent.selectOptions(screen.getByTestId(/currency-input/i), currencyOptions[1]);
  userEvent.selectOptions(screen.getByTestId(/method-input/i), ['Cartão de crédito']);
  userEvent.selectOptions(screen.getByTestId(/tag-input/i), ['Lazer']);
  userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));

  expect(global.fetch).toBeCalledTimes(2);

  await waitFor(() => {
    const { wallet: { expenses } } = store.getState();
    const { value, currency, exchangeRates } = expenses[0];

    const expenseValue = Number(value * exchangeRates[currency].ask);
    const newValue = expenseValue + oldValue;

    expect(screen.getByTestId(/total-field/i)).toHaveTextContent(Math.abs(newValue).toFixed(2));
  });

  userEvent.click(screen.getByRole('button', { name: /Excluir/i }));

  expect(screen.getByTestId(/total-field/i)).toHaveTextContent('0.00');
});
