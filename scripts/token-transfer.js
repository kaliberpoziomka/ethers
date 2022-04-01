// LINK token transfer on KOVAN TESTNET
const { ethers } = require("ethers");
const { Private } = require("../private_vars");

const INFURA_ID = Private.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(
        `https://kovan.infura.io/v3/${INFURA_ID}`
);

// MY METAMASK ETH_DEV_TEST_ACCOUNT (ROPSTEN)
const sender = "0x896Bb81531d5d0EbEf2Da24a3662F1447615Ef57";
// MY METAMASK ETH_DEV_TEST_ACCOUNT2 (ROPSTEN)
const receiver = "0x33BCe30B2C3826A5E2daCdF188FEeEFC4A3D0784";
// LINK contract address (kovan testnet)
const LINKtokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088";

const LINKtokenABI = [
    "function transfer(address to, uint256 amount) public virtual override returns (bool)",
    "function balanceOf(address) view returns (uint)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const LINKtoken = new ethers.Contract(
    LINKtokenAddress,
    LINKtokenABI,
    provider
);

// wallet 
const sender_private_key = Private.ETH_KOVAN_DEV_TEST_ACCOUNT;
const wallet = new ethers.Wallet(sender_private_key, provider);

const main = async () => {
    // State of LINK tokens before transfer
    console.log(
        `
        State of LINK tokens before transfer
        Sender amount of LINK tokens: ${ethers.utils.formatEther(await LINKtoken.balanceOf(sender))}
        Receiver mmount of LINK tokens: ${ethers.utils.formatEther(await LINKtoken.balanceOf(receiver))} 
        `
    );

    const tx = await LINKtoken.connect(wallet).transfer(receiver, ethers.utils.parseEther("0.01"));
    await tx.wait();
    console.log("TRANSACTION");
    console.log(tx);

    const block = await provider.getBlockNumber();
    const transferEvent = await LINKtoken.queryFilter('Transfer', block-1, block);
    console.log("EVENT");
    console.log(transferEvent);
    // State of LINK tokens after transfer
    console.log(
        `
        State of LINK tokens after transfer
        Sender amount of LINK tokens: ${ethers.utils.formatEther(await LINKtoken.balanceOf(sender))}
        Receiver mmount of LINK tokens: ${ethers.utils.formatEther(await LINKtoken.balanceOf(receiver))} 
        `
    );
};

main();