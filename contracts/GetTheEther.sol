//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract GetTheEther {

    event sucDeposit(address recipient,uint amount);

    // - Ether balance of every user 
    mapping(address => uint) public balance;


    function deposit(address recipient) external payable{
        require(msg.sender != recipient,"GetTheEther: invalid recipient");

        balance[recipient] = msg.value;
        emit sucDeposit(recipient,msg.value);
    }

    function withdraw() external {
        require(balance[msg.sender] != 0,"GetTheEther: no deposit");
        uint _balance = balance[msg.sender];
        balance[msg.sender] = 0;

        payable(address(msg.sender)).transfer(_balance);
    }
}