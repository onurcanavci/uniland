import { useContext, useEffect } from "react";
import Address from "../Address";
import Connect from "../Connect";
import { UserContext } from "../../../../../App";
import { getContractWithSigner } from "../../../../../contracts/contractUtils";

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

async function checkContractIsConnected(setContract) {
  if (window.ethereum) {
    const signer = await getContractWithSigner();
    if (signer) {
      setContract(signer);
      return;
    }
  }
}

const MetaMaskAuth = () => {
  const {
    userAddress,
    setUserAddress,
    contractWithSigner,
    setContractWithSigner,
  } = useContext(UserContext);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
    checkContractIsConnected(setContractWithSigner);
  }, [setUserAddress, setContractWithSigner]);

  useEffect(() => {
    setUserAddress(userAddress);
  }, [userAddress, setUserAddress]);

  useEffect(() => {
    setContractWithSigner(contractWithSigner);
  }, [contractWithSigner, setContractWithSigner]);

  return userAddress ? (
    <div style={{ color: "white" }}>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect
      setUserAddress={setUserAddress}
      setContractWithSigner={setContractWithSigner}
    />
  );
};

export default MetaMaskAuth;
