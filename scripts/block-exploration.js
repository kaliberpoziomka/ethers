const { ethers } = require("ethers");
const { Private } = require("../private_vars");

const INFURA_ID = Private.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const main = async () => {
    const blockNumber = await provider.getBlockNumber();  
    console.log(`Block Number: ${blockNumber}`);

    const block = await provider.getBlock(blockNumber);
    console.log("BLOCK")
    console.log(block);

    const { transactions } = await provider.getBlockWithTransactions(block.hash);
    const transactionNumber = 0;
    console.log(`${transactionNumber+1} TRANSACTION OF BLOCK NUMBER: ${blockNumber}`);
    console.log(transactions[0]);
};

main();