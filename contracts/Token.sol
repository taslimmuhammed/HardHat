// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0<0.9.0;

import 'hardhat/console.sol';


contract Token {
   string public  name = "TMM tokens2";//name of the token
   string public  symbol  ="TMT";//Abbrevation of token
   uint8 public  decimals = 0;

 event Transfer(address indexed _from, address indexed _to, uint256 _value);
 event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    uint public  totalSupply;
    address public founder;
    mapping (address=>uint) public balances;
    mapping (address=>mapping(address=>uint)) allowed;
    constructor(){
        totalSupply = 1000000;
        founder =msg.sender;
        balances[founder] = totalSupply;
    }
    
   function balanceOf(address _owner) public view  returns (uint256 balance){
       return balances[_owner];
      }

function transfer(address _to, uint256 _value) public  returns (bool success){
  require(balances[msg.sender]>= _value,"Not sufficient amount");
  balances[_to]+=_value; 
  balances[msg.sender]-=_value;
  emit Transfer(msg.sender, _to,_value);
  return true;
}
function approve(address _spender, uint256 _value) public  returns (bool success){
 require(balances[msg.sender]>=_value,"Not sufficient amount");
 require(_value>0);
 allowed[msg.sender][_spender]=_value;
 emit  Approval(msg.sender,_spender, _value);
 return true;
}
function allowance(address _owner, address _spender) public view  returns (uint256 remaining)
{
return allowed[_owner][_spender];
}
function transferFrom(address _from, address _to, uint256 _value) public  returns (bool success)
{
    require(allowed[_from][_to]>=_value);
    require(balances[_from]>=_value);
    balances[_from]-=_value;
    allowed[_from][_to]-=_value;
    balances[_to]+=_value;
    return true;
}
}