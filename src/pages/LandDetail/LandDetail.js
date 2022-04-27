import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";

import CustomSubland from "../../components/CustomSubland";
import {customContract, getAdmin} from "../../contracts/contractUtils";

const LandDetail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState(null);
  const [landInfo, setLandInfo] = useState(null);
  const [owner, setOwner] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [name, setName] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const { userAddress, contractWithSigner } = useContext(UserContext);

  useEffect(() => {
    console.log("userAddress: ", userAddress);
    console.log("contract: ", contractWithSigner);

    setIsLoading(true);
    try {
      getAdmin().then((response) => {
        setAdmin(response)
      })
      customContract.lands(location.state.id).then((response) => {
        setLandInfo(response)
        setGrid({
          cells: response.subland_size.toNumber(),
          rows: response.subland_size.toNumber(),
        });
      });
      customContract.ownerOf(location.state.id).then((ownerAddress) => {
        setOwner(ownerAddress.toLowerCase())
        console.log('owner', owner)
        console.log('user', userAddress)
        console.log(owner === userAddress)
      })
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [location.state.id, isLoading]);


  const transactionHandle = async (tx, message) => {
    console.log('Tx sent')
    try {
      await tx.wait();
      console.log('Mined')
      setIsLoading(true)
      alert(message)
    } catch (e) {
      alert(`An exception occurred ${e}`)
    }
  }
  const handleNameChange = async (event) => {
    event.preventDefault();
    const tx = await contractWithSigner.updateLandName(
        location.state.id,
        name
    )
    await transactionHandle(tx, 'Land Name Updated')
  }
  const handleTransferLand = async (event) => {
    event.preventDefault();
    const tx = await contractWithSigner.transferFrom(
        owner,
        transferAddress,
        location.state.id
    )
    await transactionHandle(tx, `Land transferred to ${transferAddress}`)
  }

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <Container>
        {landInfo !== null && (
            <div>
              <p>LandName: {landInfo.name}</p>
              <p>Url: {landInfo.url}</p>
            </div>
        )
      }
      {
        owner !== null && (
            <p>Owner: {owner}</p>
        )
      }
      <Box>
        {grid !== null && (
          <CustomSubland mainLandId={location.state.id} grid={grid} />
        )}
      </Box>
      {
        owner === userAddress && (
            <div>
              <form onSubmit={handleNameChange}>
                <label>Change Land Name:
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <input type="submit" />
              </form>
              <form onSubmit={handleTransferLand}>
                <label>Transfer land:
                  <input
                      type="text"
                      value={transferAddress}
                      onChange={(e) => setTransferAddress(e.target.value)}
                  />
                </label>
                <input type="submit" />
              </form>
            </div>
        )
      }

    </Container>
  );
};

export default LandDetail;
