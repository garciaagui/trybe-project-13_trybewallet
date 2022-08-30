import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, applyEditionAction } from '../redux/actions';
import OptionSelect from './OptionSelect';
import { methodOptions, tagOptions } from '../optionsData';

class EditForm extends Component {
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
    const { expenseToEdit } = this.props;
    const { value, description, currency, method, tag } = expenseToEdit;
    console.log(expenseToEdit);
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  handleApplyEdition = async () => {
    const { value, currency } = this.state;
    const { dispatch,
      expenseToEdit,
      idToEdit,
      exchangeRates,
      handleTotalField } = this.props;

    const oldValue = Number(
      expenseToEdit.value * expenseToEdit.exchangeRates[expenseToEdit.currency].ask,
    );
    const id = idToEdit;

    await dispatch(fetchCurrencies());
    const newValue = Number(value * exchangeRates[currency].ask);

    handleTotalField(newValue - oldValue);
    dispatch(applyEditionAction({ id, ...this.state, exchangeRates }));
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
          onClick={ this.handleApplyEdition }
        >
          Editar despesa
        </button>

      </form>
    );
  }
}

EditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleTotalField: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  exchangeRates: PropTypes.shape({
  }).isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
    }).isRequired,
  }).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

export default connect(mapStateToProps, null)(EditForm);
