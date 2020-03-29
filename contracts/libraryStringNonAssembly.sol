pragma solidity ^0.5.16;


library libraryStringNonAssembly {
    function charAt(string memory input, uint256 index)
        public
        pure
        returns (string memory)
    {
        bytes memory _input = bytes(input);
        require(
            index <= (_input.length - 1),
            "index cannot be more than length"
        );
        string memory _output = new string(1);
        bytes memory output = bytes(_output);
        output[0] = _input[index];
        return string(output);
    }

    function concat(string memory input1, string memory input2)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(input1, input2));
    }

    function matchStrings(string memory input1, string memory input2)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((input1))) ==
            keccak256(abi.encodePacked((input2))));
    }

    function slice(string memory input, uint256 startIndex, uint256 endIndex)
        public
        pure
        returns (string memory)
    {
        require(
            startIndex < endIndex,
            "startIndex cannot be more than endIndex"
        );
        bytes memory _input = bytes(input);
        require(
            endIndex <= _input.length,
            "endIndex cannot be more than input length"
        );
        string memory _output = new string(endIndex - startIndex);
        bytes memory output = bytes(_output);
        uint256 index;
        for (uint256 i = startIndex; i < endIndex; i++) {
            output[index] = _input[i];
            index++;
        }
        return string(output);
    }

    function slice(string memory input, uint256 index)
        public
        pure
        returns (string memory)
    {
        bytes memory _input = bytes(input);
        require(
            index < _input.length,
            "index cannot be more than input length"
        );
        return slice(input, index, _input.length);
    }

    function length(string memory input) public pure returns (uint256) {
        bytes memory _input = bytes(input);
        return _input.length;
    }
}
