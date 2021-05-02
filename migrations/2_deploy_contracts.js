var JWallet = artifacts.require("./JWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(JWallet);
};
