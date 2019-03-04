const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.nonce + 
      JSON.stringify(this.data)
    ).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2019", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;          
      }      
    }

    return true;
  }
}

function addBlocks() {  
  console.log("Mining first block");
  aleCoin.addBlock(new Block(1, "02/02/2019", { amount: 10 }));
  console.log("Mining second block");
  aleCoin.addBlock(new Block(2, "02/02/2019", { amount: 20 }));

  console.log(JSON.stringify(aleCoin,null,4));
}

function checkIfChainIsValid() {
  console.log('Is chain valid? ' + aleCoin.isChainValid());
}

let aleCoin = new Blockchain();
addBlocks();
checkIfChainIsValid()
//
//console.log(JSON.stringify(aleCoin, null, 4))

