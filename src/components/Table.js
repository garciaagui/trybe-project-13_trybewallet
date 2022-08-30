import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableData from './TableData';
import { deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  handleDeleteExpense = (id, value) => {
    const { dispatch, handleTotalField } = this.props;
    const NEGATIVE = -1;
    handleTotalField(Number(value) * NEGATIVE);
    dispatch(deleteExpenseAction(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses ? expenses.map((expense) => (
            <TableData
              key={ expense.id }
              expense={ expense }
              handleDeleteExpense={ this.handleDeleteExpense }
            />
          )) : ''}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleTotalField: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
