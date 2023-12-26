var organ = artifacts.require("./organ.sol");

module.exports = function (deployer) {
  deployer.deploy(organ);
};