const fs  = require('fs')
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require('hardhat/internal/core/params/argumentTypes');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account : ${deployer.address}`)
  const balance = await deployer.getBalance();
  console.log("Account balance :", balance.toString())
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  
const data=  {
  address:token.address,
  abi:JSON.parse(token.interface.format('json'))
};
fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data))
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
