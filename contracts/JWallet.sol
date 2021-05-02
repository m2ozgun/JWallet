pragma solidity ^0.8.0;

import "./Allowance.sol";

contract JWallet is Allowance {
    function withdraw(address payable _to, uint256 _amount) public isAllowed(_amount) {
        require(_amount < address(this).balance, "Wallet amount is not sufficient.");
        _to.transfer(_amount);
    }


    receive() external payable {}
}
