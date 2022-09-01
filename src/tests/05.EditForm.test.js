import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

it('Tests the content edition of a row', async () => {
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

  userEvent.type(valueInput, '50');
  userEvent.type(descriptionInput, 'Cinema');
  userEvent.selectOptions(currencySelect, ['EUR']);
  userEvent.selectOptions(methodSelect, ['Cartão de crédito']);
  userEvent.selectOptions(tagSelect, ['Lazer']);
  userEvent.click(addButton);

  await waitFor(() => {});
  userEvent.type(valueInput, '20');
  userEvent.type(descriptionInput, 'Uber');
  userEvent.selectOptions(currencySelect, ['DOGE']);
  userEvent.selectOptions(methodSelect, ['Dinheiro']);
  userEvent.selectOptions(tagSelect, ['Transporte']);
  userEvent.click(addButton);

  await waitFor(() => {});
  const originalExpense = store.getState().wallet.expenses[0];
  userEvent.click(screen.getAllByRole('button', { name: /Editar despesa/i })[0]);

  expect(screen.queryByRole('button', { name: /Adicionar despesa/i })).not.toBeInTheDocument();

  userEvent.clear(screen.getByTestId(/value-input/i));
  userEvent.type(screen.getByTestId(/value-input/i), '40');
  userEvent.clear(screen.getByTestId(/description-input/i));
  userEvent.type(screen.getByTestId(/description-input/i), 'Refrigerante');
  userEvent.selectOptions(await screen.findByTestId(/currency-input/i), ['USD']);
  userEvent.selectOptions(screen.getByTestId(/method-input/i), ['Dinheiro']);
  userEvent.selectOptions(screen.getByTestId(/tag-input/i), ['Alimentação']);
  userEvent.click(screen.getAllByRole('button', { name: /Editar despesa/i })[0]);

  await waitFor(() => {});
  expect(screen.queryByRole('button', { name: /Adicionar despesa/i })).toBeInTheDocument();
  const editedExpense = store.getState().wallet.expenses[0];

  expect(originalExpense).not.toEqual(editedExpense);
  expect(originalExpense.id).toBe(editedExpense.id);
});
