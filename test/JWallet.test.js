
const JWallet = artifacts.require('JWallet')

contract('JWallet', async () => {
    let walletInstance;

    beforeEach(async () => {
        walletInstance = await JWallet.new()
    })

    it('wallet balance should start with 0', async () => {
        let balance = await web3.eth.getBalance(walletInstance.address)
        console.log('balance' + balance + ' ' +  walletInstance.address)
        assert.equal(balance, 0)
    })

})