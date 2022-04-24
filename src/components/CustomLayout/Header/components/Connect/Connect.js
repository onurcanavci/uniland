import { Button } from "@mui/material";

const Connect = ({ setUserAddress }) => {
  const connect = async () => {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setUserAddress(account[0]);
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
