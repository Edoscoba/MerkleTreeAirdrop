const fs = require('fs');
const csv = require('csv-parser');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const addresses = [];

fs.createReadStream('airdrop.csv')
  .pipe(csv())
  .on('data', (row) => {
    const leaf = keccak256(row.address + row.amount);
    addresses.push(leaf);
  })
  .on('end', () => {
    const merkleTree = new MerkleTree(addresses, keccak256, { sortPairs: true });
    const merkleRoot = merkleTree.getRoot().toString('hex');
    console.log('Merkle Root:', merkleRoot);
  });
