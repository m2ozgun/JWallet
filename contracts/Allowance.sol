pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Allowance is Ownable {
    event AllowanceEvent(address indexed _of, address indexed _by, uint _prevAmount, uint _newAmount);
    mapping(address => uint256) public allowance;

    function isOwner() internal view returns (bool) {
        return owner() == msg.sender;
    }

    modifier isAllowed(uint256 _amount) {
        require(
            allowance[msg.sender] >= _amount || isOwner(),
            "Address does not have sufficient funds."
        );
        _;
    }

    function setAllowance(address _address, uint _amount) public onlyOwner {
        emit AllowanceEvent(_address, msg.sender, allowance[_address], _amount);
        allowance[_address] = _amount;
    }

    function reduceAllowance(address _address, uint _amount) public isAllowed(_amount) {
        emit AllowanceEvent(_address, msg.sender, allowance[_address], allowance[_address] - _amount);

        allowance[_address] -= _amount;
    }
}
