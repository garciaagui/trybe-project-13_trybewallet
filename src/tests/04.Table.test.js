import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
// import mockData from './helpers/mockData';

it('Verifica a tabela e suas colunas', () => {
  const columnsTitles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const expensesTable = screen.getByRole('table');
  const columns = screen.getAllByRole('columnheader');

  expect(expensesTable).toBeInTheDocument();
  expect(columns).toHaveLength(columnsTitles.length);
  columnsTitles.forEach((column) => {
    expect(screen.getByText(column)).toBeInTheDocument();
  });
});
