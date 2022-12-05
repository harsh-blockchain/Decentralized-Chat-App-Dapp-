require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "2ce2b867fb31aa46a8f8c12cd16820e53cb8bc555a8295f97e4f5f99b4d50b6d",
      ],
    },
  },
};
