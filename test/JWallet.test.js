
const JWallet = artifacts.require('JWallet')


var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('JWallet', async accounts => {
    let walletInstance, owner, recipient;

    beforeEach(async () => {
        walletInstance = await JWallet.new()
        owner = accounts[0]
        recipient = accounts[1]
    })

    it('wallet balance should start with 0', async () => {
        return await expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(0))
    })


    it('wallet balance should increase after deposit', async () => {
        await web3.eth.sendTransaction({ from: owner, to: walletInstance.address, value: new BN(1000)})
        return await expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(1000))
    })

    
    it('owner should be able to withdraw', async () => {
        await web3.eth.sendTransaction({ from: owner, to: walletInstance.address, value: new BN(1000)})
        await walletInstance.withdraw(recipient, new BN(1000))
        return await expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(0))

    })

    it('recipient should  be able to withdraw if sufficient funds', async () => {
        await web3.eth.sendTransaction({ from: owner, to: walletInstance.address, value: new BN(1000)})
        await walletInstance.setAllowance(recipient, 1000)
        return await expect(walletInstance.withdraw(recipient, new BN(100), {from : recipient})).to.eventually.be.fulfilled
    })

    it('recipient should not be able to withdraw if insufficient funds', async () => {
        await web3.eth.sendTransaction({ from: owner, to: walletInstance.address, value: new BN(1000)})
        return await expect(walletInstance.withdraw(recipient, new BN(100), {from : recipient})).to.eventually.be.rejectedWith(/not have sufficient funds/)
    })




})