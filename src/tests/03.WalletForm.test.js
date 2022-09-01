import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

it('Should have 02 inputs, 03 selects and 01 button', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  expect(screen.getByTestId(/value-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/description-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/currency-input/i)).toBeInTheDocument();
  expect(await screen.findAllByTestId(/option-currency/i)).toHaveLength(15);
  expect(screen.getByTestId(/method-input/i)).toBeInTheDocument();
  expect(screen.getAllByTestId(/option-method/i)).toHaveLength(3);
  expect(screen.getByTestId(/tag-input/i)).toBeInTheDocument();
  expect(screen.getAllByTestId(/option-tag/i)).toHaveLength(5);
  expect(screen.getByRole('button', { name: /Adicionar despesa/i })).toBeInTheDocument();
});

it('Tests API call', () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  expect(global.fetch).toBeCalledTimes(1);
  expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
});

it('Tests "expenses" state update when an expense is added and deleted', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  const valueInput = screen.getByTestId(/value-input/i);
  const descriptionInput = screen.getByTestId(/description-input/i);
  const currencySelect = await screen.findByTestId(/currency-input/i);
  const methodSelect = screen.getByTestId(/method-input/i);
  const tagSelect = screen.getByTestId(/tag-input/i);
  const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });

  expect(store.getState().wallet.expenses).toHaveLength(0);

  userEvent.type(valueInput, '50');
  userEvent.type(descriptionInput, 'Cinema');
  userEvent.selectOptions(currencySelect, ['EUR']);
  userEvent.selectOptions(methodSelect, ['Cartão de crédito']);
  userEvent.selectOptions(tagSelect, ['Lazer']);
  userEvent.click(addButton);

  await waitFor(() => {});
  const stateAfterOneAdition = store.getState().wallet.expenses;
  expect(stateAfterOneAdition).toHaveLength(1);
  expect(stateAfterOneAdition[0].id).toBe(0);

  userEvent.type(valueInput, '20');
  userEvent.type(descriptionInput, 'Uber');
  userEvent.selectOptions(currencySelect, ['DOGE']);
  userEvent.selectOptions(methodSelect, ['Dinheiro']);
  userEvent.selectOptions(tagSelect, ['Transporte']);
  userEvent.click(addButton);

  await waitFor(() => {});
  const stateAfterTwoAditions = store.getState().wallet.expenses;
  expect(stateAfterTwoAditions).toHaveLength(2);
  expect(stateAfterTwoAditions[1].id).toBe(1);

  userEvent.click(screen.getAllByRole('button', { name: /Excluir/i })[0]);

  const stateAfterOneDeletion = store.getState().wallet.expenses;
  expect(stateAfterOneDeletion).toHaveLength(1);
});
