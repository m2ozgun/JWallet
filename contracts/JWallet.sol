pragma solidity 0.8.4;

import "./Allowance.sol";

contract JWallet is Allowance {
    event AllowanceIncreased(address indexed _address, uint _amount);
    event AllowanceDecreased(address indexed _address, uint _amount);

    function withdraw(address payable _to, uint256 _amount) public isAllowed(_amount) {
        
        emit AllowanceDecreased(_to, _amount);
        _to.transfer(_amount);
    }

    receive() external payable {
        emit AllowanceIncreased(msg.sender, msg.value);
    }
}
