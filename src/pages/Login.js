import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserInfoAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isLoginBtnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value }, () => {
      const { email, password } = this.state;
      const CHARACTER_LIMIT = 6;
      const invalidEmail = email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/img);
      const invalidPassword = password.length >= CHARACTER_LIMIT;

      this.setState({ isLoginBtnDisabled: !(invalidEmail && invalidPassword) });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveUserInfoAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isLoginBtnDisabled } = this.state;
    return (
      <form>
        <h2>Login</h2>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          disabled={ isLoginBtnDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
