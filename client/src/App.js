import React, { Component } from "react";
import JWalletContract from "./contracts/JWallet.json";
import getWeb3 from "./getWeb3";

import Nav from './components/Nav'
import Main from './components/Main'

import "./App.css";

class App extends Component {
  state = { loaded: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
      
      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.deployedNetwork = JWalletContract.networks[this.networkId];
      this.instance = new this.web3.eth.Contract(
        JWalletContract.abi,
        this.deployedNetwork && this.deployedNetwork.address,
      );
      
      window.web3 = this.web3;

      let allowedBalance = await this.instance.methods.allowance(this.accounts[0]).call()
      let addressBalance  = this.web3.utils.fromWei(await window.web3.eth.getBalance(this.accounts[0]), 'ether')
      let contractBalance  = this.web3.utils.fromWei(await window.web3.eth.getBalance(this.instance.options.address), 'ether')

      const isOwner = await this.isOwner()
      this.setState({ loaded: true, account: this.accounts[0], isOwner, allowedBalance, addressBalance, contractBalance });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  isOwner = async () => {
    const owner = await this.instance.methods.owner().call();
    return this.accounts[0] === owner
  }

  withdrawMoney = async (address, amount) => {
    console.log('withdrawing money')
    let result = await this.instance.methods.withdraw(address, amount).send({ from: this.state.account })

    let allowedBalance = await this.instance.methods.allowance(this.accounts[0]).call()
    let addressBalance  = this.web3.utils.fromWei(await window.web3.eth.getBalance(this.accounts[0]), 'ether')
    let contractBalance  = this.web3.utils.fromWei(await window.web3.eth.getBalance(this.instance.options.address), 'ether')

      this.setState({ allowedBalance, addressBalance, contractBalance }, this.updateUserTokens);

    console.log(result)
  }




  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        
        <Nav account={this.state.account} />
        <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              {/* {this.state.isOwner ? (<Main role='owner'/>) : (<Main role='client'/>) }            */}
              <Main 
              allowedBalance={this.state.allowedBalance} 
              role='owner' 
              account={this.state.account}
              addressBalance={this.state.addressBalance} 
              contractBalance={this.state.contractBalance} 
              contractAddress={this.instance.options.address}
              withdrawMoney={this.withdrawMoney}

              />
            </main>
            
          </div>
      </div>
    );
  }
}

export default App;
