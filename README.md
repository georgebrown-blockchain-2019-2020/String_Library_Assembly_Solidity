# String Operations (Assembly and Non Assembly) for Solidity

## Introduction

The project is a assignment for Advance Smart Contract in George Brown College. It aims to build string operations using assembly for Solidity.

## Author Information

Name: Dinh Nguyen Anh Tuan
Student ID: 101201831

## High-level Design

Library implement string operations that costs lots of gas in Solidity.

Implementing 5 functions that interact with string type:

- Determining the string's length.
- Joining two strings.
- Extracting part of a tring.
- Reading the character at the given location in string.
- Comparing two strings are equal or not.

## Implementation Details

This project includes three files(1 contract and 2 libraries).

### libraryString.sol & libraryStringNonAssembly.sol

Both libraries implement the same 6 below functions but different approaches.

| Function Name | Input                                                | Output            | Functionality                                                            |
| ------------- | ---------------------------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| length        | (string input)                                       | uint256 strlength | Determining the string's length                                          |
| charAt        | (string input, uint256 index)                        | string output     | Reading the character in input at index location                         |
| concat        | (string input1, string input2)                       | string output     | Joining input1 and input2 into 1 String output                           |
| matchStrings  | (string input1, string input2)                       | bool              | Comparing two strings are equal or not                                   |
| slice         | (string input. uint256 startIndex, uint256 endIndex) | string output     | Extracting part of input starting from startIndex and ending at endIndex |
| slice         | (string input, uint256 index)                        | string output     | Extracting part of input starting from index                             |

1. libraryString.sol : Using assembly and abi.encodePacked to build 6 string operations.
2. libraryStringNonAssembly.sol : Converting string to bytes and using loop to process string based on specific purposes. Besides, using abi.encodePacked in order to optimize concat and matchStrings functions.

### Contract.sol

Simulating a contract that uses both libraries in order to perform string operations.

## Gas Cost Optimizations

Two libraries which are built in both ways (assembly and non-assembly) to compare gas cost and performance.

Gas used libraryString and libraryStringNonAssembly

- **concat**
  ![](/documentation/concatAssembly.png "Concat using Assembly")
  ![](/documentation/concatNonAssembly.png "Concat no using Assembly")
- **charAt**
  ![](/documentation/charAtAssembly.png "charAt using Assembly")
  ![](/documentation/charAtNonAssembly.png "charAt no using Assembly")

* **length**
  ![](/documentation/lengthAssembly.png "length using Assembly")
  ![](/documentation/lengthNonAssembly.png "length no using Assembly")

* **slice**
  ![](/documentation/sliceAssembly.png "slice using Assembly")
  ![](/documentation/sliceNonAssembly.png "slice no using Assembly")

These above examples show that use assembly for string operations costs less gas than normal way in Solidity.

## Test Strategy

7 testcases are built in order to cover all functions in both libraries.
![](/documentation/testcase.png "testcase")
![](/documentation/coverage.png "coverage")

## Installation

Install package

```
npm install
```

Migrate contract

```
truffle migrate
```

Test two libraries

```
npm test
or
npm coverage
```
