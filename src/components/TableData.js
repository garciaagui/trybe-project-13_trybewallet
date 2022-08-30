import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableData extends Component {
  render() {
    const { expense, handleDeleteExpense } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const exchange = exchangeRates[currency].ask;
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{Number(exchange).toFixed(2)}</td>
        <td>
          {Number(value * exchange).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => handleDeleteExpense(id, (value * exchange)) }
          >
            Excluir
          </button>

        </td>
      </tr>
    );
  }
}

TableData.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
    }).isRequired,
  }).isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
};

export default TableData;
