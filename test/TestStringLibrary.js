const libraryString = artifacts.require("./libraryString.sol");
const libraryStringNonAssembly = artifacts.require(
  "./libraryStringNonAssembly.sol"
);
const Contract = artifacts.require("./Contract.sol");
const truffleAssert = require("truffle-assertions");
function generateRandomString(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
contract("Testing libraryString assembly and non assembly", (accounts) => {
  let stringInstance;
  let stringNonAssemblyInstance;
  let contract;
  before(async () => {
    stringInstance = await libraryString.deployed();
    stringNonAssemblyInstance = await libraryStringNonAssembly.deployed();
    contract = await Contract.deployed();
  });
  it("Concat() should work properly in both Library", async () => {
    let str1 = generateRandomString(getRandomNumber(31));
    let str2 = generateRandomString(31 - str1.length);
    let expectedResult = str1.concat(str2);

    await contract.concatAssembly(str1, str2);
    let result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "concat() in libraryString does not work"
    );
    await contract.concatNonAssembly(str1, str2);
    result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "concat() in libraryStringNonAssembly does not work"
    );
    await truffleAssert.fails(
      contract.concatAssembly(result, result),
      truffleAssert.ErrorType.REVERT
    );
  });
  it("charAt() should work properly in both Library", async () => {
    let str = generateRandomString(getRandomNumber(32));
    let index = getRandomNumber(str.length);
    let expectedResult = str.charAt(index);

    await contract.charAtAssembly(str, index);
    let result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "charAt() in libraryString does not work"
    );
    await contract.charAtNonAssembly(str, index);
    result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "charAt() in libraryStringNonAssembly does not work"
    );
    await truffleAssert.fails(
      contract.charAtAssembly(str, str.length + 1),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.charAtAssembly(generateRandomString(33), index),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.charAtNonAssembly(str, str.length + 1),
      truffleAssert.ErrorType.REVERT
    );
  });
  it("slice() with 3 parameters should work properly in both Library", async () => {
    let str = generateRandomString(getRandomNumber(32));
    let startIndex = getRandomNumber(str.length);
    let endIndex;
    if (startIndex === str.length - 1) {
      endIndex = startIndex + 1;
    } else {
      endIndex = startIndex + 2;
    }
    let expectedResult = str.slice(startIndex, endIndex);

    await contract.sliceAssembly(str, startIndex, endIndex);
    let result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "sliceAssembly() in libraryString does not work"
    );
    await contract.sliceNonAssembly(str, startIndex, endIndex);
    result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "sliceNonAssembly() in libraryStringNonAssembly does not work"
    );
    await truffleAssert.fails(
      contract.sliceAssembly(str, str.length - 1, str.length - 2),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.sliceAssembly(str, startIndex, str.length + 2),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.sliceAssembly(generateRandomString(33), startIndex, endIndex),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.sliceNonAssembly(str, str.length - 1, str.length - 2),
      truffleAssert.ErrorType.REVERT
    );
  });
  it("slice() with 2 parameters should work properly in both Library", async () => {
    let str = generateRandomString(getRandomNumber(32));
    let index = getRandomNumber(str.length);
    let expectedResult = str.slice(index);

    await contract.sliceAssembly(str, index);
    let result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "sliceAssembly() in libraryString does not work"
    );
    await contract.sliceNonAssembly(str, index);
    result = await contract.str.call();
    assert.equal(
      expectedResult,
      result,
      "sliceNonAssembly() in libraryStringNonAssembly does not work"
    );
    await truffleAssert.fails(
      contract.sliceAssembly(str, str.length + 1),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.sliceAssembly(generateRandomString(33), index),
      truffleAssert.ErrorType.REVERT
    );
    await truffleAssert.fails(
      contract.sliceNonAssembly(str, str.length + 1),
      truffleAssert.ErrorType.REVERT
    );
  });
  it("length() should work properly in both Library", async () => {
    let str = generateRandomString(getRandomNumber(32));
    let expectedResult = str.length;

    await contract.lengthAssembly(str);
    let result = await contract.strLength.call();
    assert.equal(
      expectedResult,
      result,
      "lengthAssembly() in libraryString does not work"
    );
    await contract.lengthNonAssembly(str);
    result = await contract.strLength.call();
    assert.equal(
      expectedResult,
      result,
      "lengthNonAssembly() in libraryStringNonAssembly does not work"
    );
  });
  it("match() should work properly in both Library", async () => {
    let str = generateRandomString(getRandomNumber(32));
    let copyStr = str;
    let diffStr = generateRandomString(getRandomNumber(32));

    let checkMatchCorrectly = await contract.matchAssembly(str, copyStr);
    assert.equal(
      true,
      checkMatchCorrectly,
      "match() in libraryString does not work"
    );
    let checkMatchInCorrectly = await contract.matchAssembly(str, diffStr);
    assert.equal(
      false,
      checkMatchInCorrectly,
      "match() in libraryString does not work"
    );
    checkMatchCorrectly = await contract.matchNonAssembly(str, copyStr);
    assert.equal(
      true,
      checkMatchCorrectly,
      "match() in libraryStringNonAssembly does not work"
    );
    checkMatchInCorrectly = await contract.matchNonAssembly(str, diffStr);
    assert.equal(
      false,
      checkMatchInCorrectly,
      "match() in libraryStringNonAssembly does not work"
    );
  });
  it("libraryString should deploy with less gas than libraryStringNonAssembly", async () => {
    let deployedLibraryString = await libraryString.new();
    let deployedLibraryStringNonAssembly = await libraryStringNonAssembly.new();
    let receiptLibraryString = await web3.eth.getTransactionReceipt(
      deployedLibraryString.transactionHash
    );
    let receiptLibraryStringNonAssembly = await web3.eth.getTransactionReceipt(
      deployedLibraryStringNonAssembly.transactionHash
    );
    assert.isBelow(
      receiptLibraryString.gasUsed,
      receiptLibraryStringNonAssembly.gasUsed
    );
    console.log(
      `Gas used: withAssembly: ${receiptLibraryString.gasUsed} | nonAssembly: ${receiptLibraryStringNonAssembly.gasUsed}`
    );
  });
});
