const { ethers } = require("ethers");
const { Private } = require("../private_vars");

const INFURA_ID = Private.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

// === Contract setup variables ===
// address of a "Read" smart contract of a DAI token
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// ABI for "READ" smart contract
// in ethers.js it is really cool, because we can construct ABI with just list of function signatures (strings)
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)"
];
// creation of a new connection to contract
const DAItoken = new ethers.Contract(
    address, // address
    ERC20_ABI, // ABI
    provider // signer
);
// after creating connection to contract we can use functions from the ABI
const main = async () => {
    const tokenName = await DAItoken.name();
    const tokenSymbol = await DAItoken.symbol();
    const tokenTotalSupply = await DAItoken.totalSupply();
    const tokenBalanceOf = await DAItoken.balanceOf("0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0");
    console.log(
        `
        ${tokenSymbol}
        ${tokenName}
        Total Supply: ${ethers.utils.formatEther(tokenTotalSupply)}
        Balance of Avalanche Brodge: ${ethers.utils.formatEther(tokenBalanceOf)}
        `
    );
}

main()