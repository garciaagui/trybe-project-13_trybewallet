import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  handleTotalField = (value) => {
    this.setState((prevState) => ({ total: prevState.total + value }));
  };

  render() {
    const { total } = this.state;
    const { expenses, editor, idToEdit } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    return (
      <section>
        <Header total={ total } />
        <div>TrybeWallet</div>
        {editor ? <EditForm
          idToEdit={ idToEdit }
          expenseToEdit={ expenseToEdit }
          handleTotalField={ this.handleTotalField }
        />
          : <WalletForm handleTotalField={ this.handleTotalField } />}
        <Table handleTotalField={ this.handleTotalField } />
      </section>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps, null)(Wallet);
