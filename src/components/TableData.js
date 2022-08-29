import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableData extends Component {
  render() {
    const { expense } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>
          {Number(value * exchangeRates[currency].ask).toFixed(2)}
        </td>
        <td>Real</td>
        <td>{}</td>
      </tr>
    );
  }
}

TableData.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
    }).isRequired,
  }).isRequired,
};

export default TableData;
