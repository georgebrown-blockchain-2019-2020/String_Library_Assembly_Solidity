pragma solidity ^0.5.16;


library libraryString {
    function charAt(string memory input, uint256 index)
        public
        pure
        returns (string memory output)
    {
        assembly {
            function allocate(length) -> pos {
                let freePointer := 0x40
                pos := mload(freePointer)
                mstore(
                    freePointer,
                    add(pos, and(add(add(1, 0x20), 0x1f), not(0x1f)))
                )
            }

            let dataSize := mload(input) // 32 bytes
            if gt(dataSize, 32) {
                revert(0, 0)
            }
            if gt(index, sub(dataSize, 1)) {
                revert(0, 0)
            }
            output := allocate(dataSize)
            mstore(output, 1)
            mstore(
                add(output, 0x20),
                shl(0xf8, shr(0xf8, mload(add(0xa0, index))))
            )
        }
    }

    function concat(string memory input1, string memory input2)
        public
        pure
        returns (string memory output)
    {
        assembly {
            function allocate(length) -> pos {
                let freePointer := 0x40
                pos := mload(freePointer)
                mstore(
                    freePointer,
                    add(pos, and(add(add(length, 0x20), 0x1f), not(0x1f)))
                )
            }

            let dataSize := add(mload(input1), mload(input2)) // 32 bytes
            if gt(dataSize, 32) {
                revert(0, 0)
            }
            output := allocate(dataSize)
            mstore(output, dataSize)
            mstore(
                add(output, 0x20),
                add(mload(0xa0), shr(mul(8, mload(input1)), mload(0xe0)))
            )
        }
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
        returns (string memory output)
    {
        assembly {
            if gt(startIndex, endIndex) {
                revert(0, 0)
            }
            function allocate(length) -> pos {
                let freePointer := 0x40
                pos := mload(freePointer)
                mstore(
                    freePointer,
                    add(pos, and(add(add(length, 0x20), 0x1f), not(0x1f)))
                )
            }
            let dataSize := mload(input)
            if gt(dataSize, 32) {
                revert(0, 0)
            }
            if gt(endIndex, dataSize) {
                revert(0, 0)
            }
            output := allocate(dataSize)
            let size := sub(endIndex, startIndex)
            mstore(output, size)
            mstore(add(output, 0x20), mload(add(0xa0, startIndex)))
        }
    }

    function slice(string memory input, uint256 index)
        public
        pure
        returns (string memory output)
    {
        uint256 inputLength;
        assembly {
            inputLength := mload(input)
        }
        output = slice(input, index, inputLength);
        return output;
    }

    function length(string memory input)
        public
        pure
        returns (uint256 strlength)
    {
        assembly {
            strlength := mload(input)
        }
    }
}
