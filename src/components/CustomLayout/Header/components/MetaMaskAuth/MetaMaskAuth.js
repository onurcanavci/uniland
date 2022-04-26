import { useContext, useEffect } from "react";
import Address from "../Address";
import Connect from "../Connect";
import { UserContext } from "../../../../../App";

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

const MetaMaskAuth = () => {
  const { userAddress, setUserAddress, setUserSigner } =
    useContext(UserContext);
  console.log("userAddress: ", userAddress);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, [setUserAddress]);

  useEffect(() => {
    setUserAddress(userAddress);
  }, [userAddress, setUserAddress]);

  return userAddress ? (
    <div style={{ color: "white" }}>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={(setUserAddress, setUserSigner)} />
  );
};

export default MetaMaskAuth;
