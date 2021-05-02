
import React, { Component } from 'react'

class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-lightfixed-top bg-light flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
        >
          &nbsp; JWallet Shared Wallet
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;