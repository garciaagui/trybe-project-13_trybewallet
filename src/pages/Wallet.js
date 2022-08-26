import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  render() {
    const { expenses } = this.state;
    return (
      <section>
        <Header expenses={ expenses } />
        <div>TrybeWallet</div>
      </section>
    );
  }
}

export default Wallet;
