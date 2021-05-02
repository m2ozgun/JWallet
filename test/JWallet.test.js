
const JWallet = artifacts.require('JWallet')


var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('JWallet', async accounts => {
    let walletInstance;

    beforeEach(async () => {
        walletInstance = await JWallet.new()
    })

    it('wallet balance should start with 0', async () => {
        expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(0))
    })
    
    it('should be able to withdraw', async () => {
        await web3.eth.sendTransaction({ from: accounts[0], to: walletInstance.address, value: web3.utils.toWei(new BN(1), "ether")})
        expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(web3.utils.toWei(new BN(1), "ether"))

        // authorized access
        await walletInstance.withdraw(accounts[1], web3.utils.toWei(new BN(0.5), "ether"))
        expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(web3.utils.toWei(new BN(0.5), "ether"))

        // unauthorized access reject
        expect(walletInstance.withdraw(accounts[1], web3.utils.toWei(new BN(0.5), "ether"), {from : accounts[1]})).to.eventually.be.rejected

    })




})