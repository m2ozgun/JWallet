import React, { Component } from 'react'

class Main extends Component {
  state = { loaded: false };
  render() {
    let infoContent
    if (this.state.info) {
      infoContent = (<div class="alert alert-success" role="alert">
      {this.state.info}
    </div>)
    }
    let content
    if (this.props.role === 'client') {
      content = (
        <div className="card mb-4">
        <div className="card-body">
          <form
            className="mb-3"
            onSubmit={async (event) => {
              event.preventDefault()
              const address = this.withdrawAddress.value.toString()
              let amount
              amount = this.withdrawAmount.value.toString()
              amount = window.web3.utils.toWei(amount, 'Ether')
              let info = await this.props.withdrawMoney(address, amount)
              this.setState({ info  })
              console.log(this.state.info)
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
      )
    } else if (this.props.role === "owner"){
      content = (
        <div>

<div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={async (event) => {
                event.preventDefault()
                const address = this.withdrawAddress.value.toString()
                let amount
                amount = this.withdrawAmount.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                let info = await this.props.withdrawMoney(address, amount)
                this.setState({ info  })
                console.log(this.state.info)
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
        </div>        <div className="card mb-4">
          <div className="card-body">
            <form
              className="mb-3"
              onSubmit={async (event) => {
                event.preventDefault()
                const address = this.allowanceAddress.value.toString()
                let amount
                amount = this.allowanceAmount.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                let info = await this.props.setAllowance(address, amount)
                this.setState({ info  })
                console.log(this.state.info)
              }}
            >
              <div>
                <label className="float-left">
                  <b>Edit allowance</b>
                </label>
                <span className="float-right text-muted">
                  Wallet Balance: {this.props.addressBalance} ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => {
                    this.allowanceAmount = input
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
                    this.allowanceAddress = input
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
        <p className="small">Current address: {this.props.role}</p>
        <div className="alert alert-primary" role="alert">
          You can deposit ETH to this contract: {this.props.contractAddress}
        </div>
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
              <td>{this.props.role === 'owner' ? this.props.contractBalance : this.props.allowedBalance} ETH</td>

            </tr>
          </tbody>
        </table>

        {content}
        {infoContent}
      </div>
    )
  }
}

export default Main
