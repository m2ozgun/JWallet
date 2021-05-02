pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract JWallet is Ownable {
    mapping(address => uint) allowance;

    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }

    modifier isAllowed(uint _amount) {
        require(allowance[msg.sender] >= _amount || isOwner(), "Address does not have sufficient funds."); 
        _;
    }

    function withdraw(address payable _to, uint _amount) public isAllowed(_amount){
        require(_amount < address(this).balance, "Wallet amount is not sufficient.");

        _to.transfer(_amount);
    }

    receive() external payable {

    }
}