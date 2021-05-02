import React, { Component } from 'react'

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <p className="small">Current address: {this.props.role}</p>
        <p className="small">Contract address: {this.props.contractAddress}</p>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Contract Balance</th>
              <th scope="col">Your Allowed Balance</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.contractBalance} ETH</td>
              <td>{this.props.allowedBalance} ETH</td>

            </tr>
          </tbody>
        </table>

        <div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault()
                const address = this.withdrawAddress.value.toString()
                let amount
                amount = this.withdrawAmount.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.withdrawMoney(address, amount)
              }}
            >
              <div>
                <label className="float-left">
                  <b>Withdraw ETH</b>
                </label>
                <span className="float-right text-muted">
                  Wallet Balance: {this.props.addressBalance} ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.withdrawAmount = input
                  }}
                  className="form-control form-control-lg"
                  placeholder="Amount"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">ETH</div>
                </div>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.withdrawAddress = input
                  }}
                  className="form-control form-control-lg"
                  placeholder="Address"
                  required
                />

              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Withdraw
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
