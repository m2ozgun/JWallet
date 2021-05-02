import React, { Component } from 'react'

class Main extends Component {
  render() {
    let content
    if (this.props.role === 'client') {
      content = (
        <div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }}
            >
              <div>
                <label className="float-left">
                  <b>Withdraw ETH</b>
                </label>
                <span className="float-right text-muted">
                  Wallet Balance: {this.props.balance} ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.input = input
                  }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">ETH</div>
                </div>
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
      )
    } else if (this.props.role === 'owner') {
      content = (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <form
                className="mb-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  let amount
                  amount = this.input.value.toString()
                  amount = window.web3.utils.toWei(amount, 'Ether')
                  this.props.stakeTokens(amount)
                }}
              >
                <div>
                  <label className="float-left">
                    <b>Withdraw ETH</b>
                  </label>
                  <span className="float-right text-muted">
                    Wallet Balance: {this.props.balance} ETH
                  </span>
                </div>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => {
                      this.input = input
                    }}
                    className="form-control form-control-lg"
                    placeholder="0"
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
                      this.input = input
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
          <div className="card mb-4">
            <div className="card-body">
              <form
                className="mb-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  let amount
                  amount = this.input.value.toString()
                  amount = window.web3.utils.toWei(amount, 'Ether')
                  this.props.stakeTokens(amount)
                }}
              >
                <div>
                  <label className="float-left">
                    <b>Edit Balance</b>
                  </label>
                  <span className="float-right text-muted">
                    Wallet Balance: {this.props.balance} ETH
                  </span>
                </div>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => {
                      this.input = input
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
                      this.input = input
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
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id="content" className="mt-3">
        <p className="small">Current address is: {this.props.role}</p>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Current Allowed Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.allowedBalance} ETH</td>
            </tr>
          </tbody>
        </table>

        {content}
      </div>
    )
  }
}

export default Main
