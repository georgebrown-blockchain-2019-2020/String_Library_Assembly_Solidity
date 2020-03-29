const libraryString = artifacts.require("./libraryString.sol");
const libraryStringNonAssembly = artifacts.require(
  "./libraryStringNonAssembly.sol"
);
const Contract = artifacts.require("./Contract.sol");
module.exports = function(deployer) {
  deployer.deploy(libraryString);
  deployer.deploy(libraryStringNonAssembly);
  deployer.link(libraryString, Contract);
  deployer.link(libraryStringNonAssembly, Contract);
  deployer.deploy(Contract);
};
