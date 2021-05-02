pragma solidity ^0.8.0;


contract JWallet {

    function withdraw(address payable _to, uint _amount) public {
        require(_amount > address(this).balance, "Wallet amount is not sufficient.");
        _to.transfer(_amount);
    }

    receive() external payable {

    }
}