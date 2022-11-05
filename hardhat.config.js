require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const INFURA_URL = 'https://ropsten.infura.io/v3/da20f1caaac04f32a776405696de3207'
const PRIVATE_KEY = '76921d1cb6d55c44a71942a3be07d009ea8a2fd432b624eabfc46f72ca0ca316'
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropston:{
         url : INFURA_URL,
         accounts:[`0x${PRIVATE_KEY}`]
    }
  }
};
