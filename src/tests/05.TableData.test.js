import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

it('Verifica a alimentação da tabela por meio do estado', () => {
  delete mockData.USDT;

  const initialState = {
    wallet: {
      expenses: [{
        id: 0,
        value: '50',
        description: 'Cinema',
        currency: 'EUR',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        exchangeRates: mockData,
      }],
      currencies: Object.keys(mockData),
      exchangeRates: mockData,
    },
  };

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

  const { wallet: { expenses } } = store.getState();
  const { description, tag, method, value, currency, exchangeRates } = expenses[0];

  const dataCells = screen.getAllByRole('cell');
  const dataContent = [
    description, tag, method,
    Number(value).toFixed(2),
    exchangeRates[currency].name,
    Number(exchangeRates[currency].ask).toFixed(2),
    Number(value * exchangeRates[currency].ask).toFixed(2),
    'Real', ''];

  expect(dataCells).toHaveLength(9);
  dataCells.forEach((cell, index) => {
    expect(cell).toHaveTextContent(dataContent[index]);
  });
});
