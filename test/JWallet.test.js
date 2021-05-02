
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
        let balance = await web3.eth.getBalance(walletInstance.address)
        expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(0))
    })
    
    it('balance should increase after deposit', async () => {
        await web3.eth.sendTransaction({ from: accounts[0], to: walletInstance.address, value: 1})
        expect(web3.eth.getBalance(walletInstance.address)).to.eventually.be.a.bignumber.equal(new BN(1))

    })

})