import { Button } from "@mui/material";
import { getContractWithSigner } from "../../../../../contracts/contractUtils";

const Connect = ({ setUserAddress, setContractWithSigner }) => {
  const connect = async () => {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setUserAddress(account[0]);
    setContractWithSigner(getContractWithSigner());
  };

  return (
    <Button
      variant='contained'
      style={{ backgroundColor: "#e5771b" }}
      onClick={connect}
    >
      Connect to MetaMask
    </Button>
  );
};

export default Connect;
