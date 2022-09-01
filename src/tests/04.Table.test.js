import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

it('Should have 09 column headers', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const columnsTitles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
  const columnHeaders = screen.getAllByRole('columnheader');

  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(columnHeaders).toHaveLength(columnsTitles.length);
  columnsTitles.forEach((column) => {
    expect(screen.getByText(column)).toBeInTheDocument();
  });
});

it('Should be no other row than the header if no expense has been added', () => {
  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const { wallet: { expenses } } = store.getState();
  const dataCells = screen.queryAllByRole('cell');

  expect(expenses.length).toBeFalsy();
  expect(dataCells).toHaveLength(expenses.length);
  dataCells.forEach((cell) => {
    expect(cell).not.toBeInTheDocument();
  });
  expect(screen.getByTestId('table-data')).toBeEmptyDOMElement();
});

it('Tests the creation/deletion of a row after adding/deleting an expense', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  const valueInput = screen.getByTestId(/value-input/i);
  const descriptionInput = screen.getByTestId(/description-input/i);
  const currencySelect = await screen.findByTestId(/currency-input/i);
  const methodSelect = screen.getByTestId(/method-input/i);
  const tagSelect = screen.getByTestId(/tag-input/i);
  const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });

  expect(screen.getAllByRole('row')).toHaveLength(1);

  userEvent.type(valueInput, '50');
  userEvent.type(descriptionInput, 'Cinema');
  userEvent.selectOptions(currencySelect, ['EUR']);
  userEvent.selectOptions(methodSelect, ['Cartão de crédito']);
  userEvent.selectOptions(tagSelect, ['Lazer']);
  userEvent.click(addButton);

  await waitFor(() => {});
  const rowsAfterOneAdition = screen.getAllByRole('row');
  expect(rowsAfterOneAdition).toHaveLength(2);

  userEvent.type(valueInput, '20');
  userEvent.type(descriptionInput, 'Uber');
  userEvent.selectOptions(currencySelect, ['DOGE']);
  userEvent.selectOptions(methodSelect, ['Dinheiro']);
  userEvent.selectOptions(tagSelect, ['Transporte']);
  userEvent.click(addButton);

  await waitFor(() => {});
  const rowsAfterTwoAditions = screen.getAllByRole('row');
  expect(rowsAfterTwoAditions).toHaveLength(3);

  userEvent.click(screen.getAllByRole('button', { name: /Excluir/i })[0]);

  const rowsAfterOneDeletion = screen.getAllByRole('row');
  expect(rowsAfterOneDeletion).toHaveLength(2);
});

it('Tests the content of a row after adding an expense', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  userEvent.type(screen.getByTestId(/value-input/i), '50');
  userEvent.type(screen.getByTestId(/description-input/i), 'Cinema');
  userEvent.selectOptions(await screen.findByTestId(/currency-input/i), ['EUR']);
  userEvent.selectOptions(screen.getByTestId(/method-input/i), ['Cartão de crédito']);
  userEvent.selectOptions(screen.getByTestId(/tag-input/i), ['Lazer']);
  userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));

  await waitFor(() => {});
  const { wallet: { expenses } } = store.getState();
  const { description, tag, method, value, currency, exchangeRates } = expenses[0];

  const dataCells = screen.getAllByRole('cell');
  const dataContent = [
    description, tag, method,
    Number(value).toFixed(2),
    exchangeRates[currency].name,
    Number(exchangeRates[currency].ask).toFixed(2),
    Number(value * exchangeRates[currency].ask).toFixed(2),
    /Real/i, /ExcluirEditar despesa/i];

  expect(dataCells).toHaveLength(9);
  expect(screen.getByRole('button', { name: /Excluir/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Editar despesa/i })).toBeInTheDocument();
  dataCells.forEach((cell, index) => {
    expect(cell).toHaveTextContent(dataContent[index]);
  });
});
