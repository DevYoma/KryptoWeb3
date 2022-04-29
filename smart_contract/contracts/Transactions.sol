// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// similar to a class
contract Transactions{
    uint256 transactionCounter;  // defining an integer variable

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); // a function you emit or call later on
    //  event Transfer(Type variableName, )

    // struct or structure
    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // defining an Array
    TransferStruct[] transactions; // transactions variable is an array of TransferStruct object

    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword ) public{
        // returns void
        transactionCounter += 1;
        // this below adds our transactions to the list of transactions, this does not transfer yet
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        // to make the transfer, we have to emit the event
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);     
    }

    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions; 
    }
    
    function getTransactionCount() public view returns (uint256){
        return transactionCounter;
    }

}

 