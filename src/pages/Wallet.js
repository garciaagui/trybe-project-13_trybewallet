import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  handleAddValue = (value) => {
    const convertedValue = Number(value.toFixed(2));
    this.setState((prevState) => ({ expenses: prevState.expenses + convertedValue }));
  };

  render() {
    const { expenses } = this.state;
    return (
      <section>
        <Header expenses={ expenses } />
        <div>TrybeWallet</div>
        <WalletForm handleAddValue={ this.handleAddValue } />
      </section>
    );
  }
}

export default Wallet;
