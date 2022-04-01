const { ethers } = require("ethers");
const { Private } = require("../private_vars");

const INFURA_ID = Private.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const address = "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8";
const main = async () => {
    let balance = await provider.getBalance(address);
    console.log(
        `\nETH Balance of ${address} is: ${ethers.utils.formatEther(balance)} ETH`
    );
}

main()