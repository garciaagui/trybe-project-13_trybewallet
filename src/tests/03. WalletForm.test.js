import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

it('Verifica os elementos de WalletForm', () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const initialState = {
    wallet: {
      currencies: Object.keys(mockData).filter((key) => key !== 'USDT'),
    },
  };

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

  const valueInput = screen.getByTestId(/value-input/i);
  const descriptionInput = screen.getByTestId(/description-input/i);
  const currencySelect = screen.getByTestId(/currency-input/i);
  const currencyOptions = screen.getAllByTestId(/option-currency/i);
  const methodSelect = screen.getByTestId(/method-input/i);
  const methodOptions = screen.getAllByTestId(/option-method/i);
  const tagSelect = screen.getByTestId(/tag-input/i);
  const tagOptions = screen.getAllByTestId(/option-tag/i);

  expect(valueInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(currencySelect).toBeInTheDocument();
  expect(currencyOptions).toHaveLength(15);
  expect(methodSelect).toBeInTheDocument();
  expect(methodOptions).toHaveLength(3);
  expect(tagSelect).toBeInTheDocument();
  expect(tagOptions).toHaveLength(5);
});

it('Testa a chamada da API', () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const initialState = {
    wallet: {
      currencies: Object.keys(mockData).filter((key) => key !== 'USDT'),
    },
  };

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
});

// it('Testa se o estado global "currencies" ao entrar na tela', () => {
//   const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

//   const inputEmail = screen.getByTestId(/email-input/i);
//   const inputPassword = screen.getByTestId(/password-input/i);
//   const submitButton = screen.getByRole('button', { name: /Entrar/i });

//   userEvent.type(inputEmail, 'test@test.com');
//   userEvent.type(inputPassword, 'xxxxxx');
//   userEvent.click(submitButton);

//   const { wallet: { currencies } } = store.getState();

//   expect(currencies).toBe('xxxxxxxxxx');
// });
