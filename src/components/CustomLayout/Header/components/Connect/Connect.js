import { Button } from "@mui/material";
import { getContractWithSigner } from "../../../../../constants/contractAbi";

const Connect = ({ setUserAddress, setUserSigner }) => {
  const connect = async () => {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setUserAddress(account[0]);

    getContractWithSigner()
      .then((signer) => {
        setUserSigner(signer);
      })
      .catch((e) => alert("An unexpected error occured!"));
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
