pragma solidity ^0.5.16;
import "./libraryString.sol";
import "./libraryStringNonAssembly.sol";


contract Contract {
    string public str;
    uint256 public strLength;

    function concatAssembly(string memory a, string memory b) public {
        str = libraryString.concat(a, b);
    }

    function concatNonAssembly(string memory a, string memory b) public {
        str = libraryStringNonAssembly.concat(a, b);
    }

    function charAtAssembly(string memory a, uint256 index) public {
        str = libraryString.charAt(a, index);
    }

    function charAtNonAssembly(string memory a, uint256 index) public {
        str = libraryStringNonAssembly.charAt(a, index);
    }

    function sliceAssembly(
        string memory a,
        uint256 startIndex,
        uint256 endIndex
    ) public {
        str = libraryString.slice(a, startIndex, endIndex);
    }

    function sliceNonAssembly(
        string memory a,
        uint256 startIndex,
        uint256 endIndex
    ) public {
        str = libraryStringNonAssembly.slice(a, startIndex, endIndex);
    }

    function sliceAssembly(string memory a, uint256 index) public {
        str = libraryString.slice(a, index);
    }

    function sliceNonAssembly(string memory a, uint256 index) public {
        str = libraryStringNonAssembly.slice(a, index);
    }

    function lengthAssembly(string memory a) public {
        strLength = libraryString.length(a);
    }

    function lengthNonAssembly(string memory a) public {
        strLength = libraryStringNonAssembly.length(a);
    }

    function matchAssembly(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return libraryString.matchStrings(a, b);
    }

    function matchNonAssembly(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return libraryStringNonAssembly.matchStrings(a, b);
    }
}
