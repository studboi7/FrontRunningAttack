// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Quiz {
    string public question;
    bytes32 private answerHash;
    address public winner;
    bool public answered;
    uint public reward;

    constructor(string memory _question, string memory _answer) payable {
        question = _question;
        answerHash = keccak256(abi.encodePacked(_answer));
        reward = msg.value;
    }

    function submitAnswer(string memory _answer) public {
        require(!answered, "Already answered");
        if (keccak256(abi.encodePacked(_answer)) == answerHash) {
            winner = msg.sender;
            answered = true;
            payable(msg.sender).transfer(reward);
        }
    }
}
