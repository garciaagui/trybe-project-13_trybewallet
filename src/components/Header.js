import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <section>
        <span data-testid="email-field">
          {user.email}
        </span>
        <span data-testid="total-field">
          {Math.abs(expenses).toFixed(2)}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </section>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  expenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Header);
