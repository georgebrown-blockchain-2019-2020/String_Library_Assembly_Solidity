pragma solidity ^0.6.0;


library stringLibrary {
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

            let inputSize := mload(input) // 32 bytes
            output := allocate(inputSize)
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
            output := allocate(dataSize)
            mstore(output, dataSize)
            mstore(
                add(output, 0x20),
                add(mload(0xa0), shr(mul(8, mload(input1)), mload(0xe0)))
            )
        }
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
