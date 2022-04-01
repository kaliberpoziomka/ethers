const { ethers } = require("ethers");
const { Private } = require("../private_vars");

const INFURA_ID = Private.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(
        `https://ropsten.infura.io/v3/${INFURA_ID}`
);
// MY METAMASK ETH_DEV_TEST_ACCOUNT2 (ROPSTEN)
const sender = "0x33BCe30B2C3826A5E2daCdF188FEeEFC4A3D0784";
// MY METAMASK ETH_DEV_TEST_ACCOUNT (ROPSTEN)
const receiver = "0x896Bb81531d5d0EbEf2Da24a3662F1447615Ef57";
// PRIVATE KEY OF MY METAMASK ETH_DEV_TEST_ACCOUNT (ROPSTEN)
const sender_private_key = Private.ETH_ROPSTEN_DEV_TEST_ACCOUNT2;
// wallet can be created from address' private and provider
// address can be is actually created from private key (elliptic curve) 
const wallet = new ethers.Wallet(sender_private_key, provider);

const main = async () => {
    // Accounts state before transfer
    console.log(
        `
        Accounts state before transfer:
        Sender: ${ethers.utils.formatEther(await provider.getBalance(sender))}
        Receiver: ${ethers.utils.formatEther(await provider.getBalance(receiver))}
        `
    );
    // sending a transaction
    const tx = await wallet.sendTransaction({
        to:receiver,
        value: ethers.utils.parseEther("0.025")
    });
    // waiting until a transaction finishes
    await tx.wait();
    // log details about transaction
    console.log(tx);

    // Accounts state after transfer
    console.log(
        `
        Accounts state after transfer:
        Sender: ${ethers.utils.formatEther(await provider.getBalance(sender))}
        Receiver: ${ethers.utils.formatEther(await provider.getBalance(receiver))}
        `
    );
};

main();