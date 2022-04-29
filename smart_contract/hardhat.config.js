require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/RO9UebQ6lposoXPRBpsEqAbeCraw0_CA',
      accounts: [ 'bf468872b8827f6f560320f90dad3a83d0fa1f788693c39fd6b308f419391e5b' ]
    }
  }
}