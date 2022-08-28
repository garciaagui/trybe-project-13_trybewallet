import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import OptionSelect from './OptionSelect';

class WalletForm extends Component {
  componentDidMount() {
    const { getCurrrencies } = this.props;
    getCurrrencies();
  }

  render() {
    const { currencies } = this.props;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            placeholder="Valor"
            data-testid="value-input"
            // value={  }
            // onChange={  }
          />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            id="description"
            placeholder="Descrição"
            data-testid="description-input"
            // value={  }
            // onChange={  }
          />
        </label>

        <label htmlFor="currency">
          <select
            id="currency"
            data-testid="currency-input"
            // value={  }
            // onChange={  }
          >
            {currencies.map((currency) => (
              <OptionSelect
                key={ `KEY-${currency}` }
                optionValue={ currency }
                optionId="option-currency"
              />
            ))}
          </select>
        </label>

        <label htmlFor="method">
          <select
            id="method"
            data-testid="method-input"
            // value={  }
            // onChange={  }
          >
            {methodOptions.map((method) => (
              <OptionSelect
                key={ `KEY-${method}` }
                optionValue={ method }
                optionId="option-method"
              />
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          <select
            id="tag"
            data-testid="tag-input"
            // value={  }
            // onChange={  }
          >
            {tagOptions.map((tag) => (
              <OptionSelect
                key={ `KEY-${tag}` }
                optionValue={ tag }
                optionId="option-tag"
              />
            ))}
          </select>
        </label>

      </form>
    );
  }
}

WalletForm.propTypes = {
  getCurrrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    codein: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
