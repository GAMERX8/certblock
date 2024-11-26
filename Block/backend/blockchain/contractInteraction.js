const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey = "YOUR_PRIVATE_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = require("./contractABI.json"); // ABI del contrato inteligente

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = {
    issueCertificate: async (data) => {
        const tx = await contract.issueCertificate(
            data.studentName,
            data.title,
            data.date,
            data.issuer
        );
        await tx.wait();
        return tx.hash;
    },
    verifyCertificate: async (hash) => {
        return await contract.verifyCertificate(hash);
    },
};
