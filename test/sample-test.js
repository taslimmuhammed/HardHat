const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Token", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy("Hello, world!");
//     await token.deployed();

//     expect(await token.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await token.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await token.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("Token",()=>{
  let Token, token, owner, addr1, addr2;
 beforeEach(async()=>{
  Token = await ethers.getContractFactory("Token")
  token = await Token.deploy();
  [owner, addr1, addr2,_] =  await ethers.getSigners()
 })

  describe("Deployment",()=>{
    it("should set the right owner", async()=>{
      expect(await token.founder()).to.equal(owner.address)
    })

    it("should assign the total supply of tokens to the owner",async()=>{
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    })
  })

  describe("Transactions", ()=>{
    it("Should transfer tokens between accounts", async()=>{
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50)

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50)
    })
    it("should fail if the sender does not have enough tokens", async()=>{
      const initialOwnerBalance  =  await token.balanceOf(owner.address)
      await expect(
        token
          .connect(addr1).transfer(owner.address, 1)
        )
        .to.be.revertedWith("Not sufficient amount");
        expect(await token.balanceOf(owner.address))
        .to.equal(initialOwnerBalance)
    });

    it("Should updatebalances after transfers", async()=>{
      const initialOwnerBalance = await token.balanceOf(owner.address)
      await token.transfer(addr1.address,100)
      await token.transfer(addr2.address,50)
      
      const finalWonerBalance = await token.balanceOf(owner.address)
      expect(finalWonerBalance).to.equal(initialOwnerBalance-150)

      const addr1Balance  = await token.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(100)

      const addr2Balance  = await token.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(50)
    })
  })
})
