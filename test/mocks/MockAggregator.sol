// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract MockAggregator {
    int256 private answer;
    uint8 public constant decimals = 8;

    function setAnswer(int256 _answer) external {
        answer = _answer;
    }

    function latestAnswer() external view returns (int256) {
        return answer;
    }
}
