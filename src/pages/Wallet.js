import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  handleTotalField = (value) => {
    // const convertedValue = Number(value.toFixed(2));
    this.setState((prevState) => ({ expenses: prevState.expenses + value }));
  };

  render() {
    const { expenses } = this.state;
    return (
      <section>
        <Header expenses={ expenses } />
        <div>TrybeWallet</div>
        <WalletForm handleTotalField={ this.handleTotalField } />
        <Table handleTotalField={ this.handleTotalField } />
      </section>
    );
  }
}

export default Wallet;
