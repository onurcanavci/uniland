import { ethers } from "ethers";
import { contractAbi } from "../contracts/contractAbi";
import { contractAddress } from "../contracts/contractAddress";

const provider = ethers.getDefaultProvider(
  ethers.providers.getNetwork("ropsten")
);

export const getContractWithSigner = async () => {
  const metamaskProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  await metamaskProvider.send("eth_requestAccounts", []);
  const signer = await metamaskProvider.getSigner();
  return customContract.connect(signer);
};

export const customContract = new ethers.Contract(
  contractAddress,
  contractAbi,
  provider
);
