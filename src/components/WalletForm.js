import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenseAction } from '../redux/actions';
import OptionSelect from './OptionSelect';
import { methodOptions, tagOptions } from '../optionsData';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleAddExpense = async () => {
    const { dispatch, expenses, exchangeRates, handleAddValue } = this.props;
    const { value, currency } = this.state;
    const id = expenses.length === 0 ? 0 : (expenses[expenses.length - 1].id + 1);

    await dispatch(fetchCurrencies());
    handleAddValue(value * exchangeRates[currency].ask);
    dispatch(addExpenseAction({ id, ...this.state, exchangeRates }));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            placeholder="Valor"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            id="description"
            placeholder="Descrição"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyName) => (
              <OptionSelect
                key={ `KEY-${currencyName}` }
                optionValue={ currencyName }
                optionId="option-currency"
              />
            ))}
          </select>
        </label>

        <label htmlFor="method">
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            {methodOptions.map((methodOption) => (
              <OptionSelect
                key={ `KEY-${methodOption}` }
                optionValue={ methodOption }
                optionId="option-method"
              />
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          <select
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            {tagOptions.map((tagOption) => (
              <OptionSelect
                key={ `KEY-${tagOption}` }
                optionValue={ tagOption }
                optionId="option-tag"
              />
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleAddValue: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  exchangeRates: PropTypes.shape({
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

export default connect(mapStateToProps, null)(WalletForm);
