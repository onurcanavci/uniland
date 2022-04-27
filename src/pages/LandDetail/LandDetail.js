import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";

import CustomSubland from "../../components/CustomSubland";
import {customContract, getAdmin} from "../../contracts/contractUtils";
import {BigNumber} from "ethers";

const LandDetail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState(null);
  const [landInfo, setLandInfo] = useState(null);
  const [owner, setOwner] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [name, setName] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [mintLandField, setMintLandField] = useState({
    to: null,
    name: null,
    url: null,
    subland_size: null
  });
  const { userAddress, contractWithSigner } = useContext(UserContext);

  useEffect(() => {
    console.log("userAddress: ", userAddress);
    console.log("contract: ", contractWithSigner);

    setIsLoading(true);
    try {
      getAdmin().then((response) => {
        setAdmin(response.toLowerCase())
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
  const handleMintLand = async (event) => {
    event.preventDefault();
    console.log('mintLandFiel', mintLandField)
    const tx = await contractWithSigner.mintLand(
        mintLandField.to,
        location.state.id,
        mintLandField.name,
        mintLandField.url,
        mintLandField.subland_size
    )
    await transactionHandle(tx, `Land minted to ${mintLandField.to}`)
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
      {
        userAddress === admin && owner === null && (
        <form onSubmit={handleMintLand}>
          <label>Mint this land:
            <input
              type="text"
              placeholder="to"
              value={mintLandField.to}
              onChange={(e) => setMintLandField({
                ...mintLandField,
                to: e.target.value
              })}
            />
            <input
                type="text"
                placeholder="name"
                value={mintLandField.name}
                onChange={(e) => setMintLandField({
                  ...mintLandField,
                  name: e.target.value
                })}
            />
            <input
                type="text"
                placeholder="url"
                value={mintLandField.url}
                onChange={(e) => setMintLandField({
                  ...mintLandField,
                  url: e.target.value
                })}
            />
            <input
                type="text"
                placeholder="subland_size"
                value={mintLandField.subland_size}
                onChange={(e) => setMintLandField({
                  ...mintLandField,
                  subland_size: BigNumber.from(e.target.value)
                })}
            />
            </label>
          <input type="submit" />
        </form>
        )
      }

    </Container>
  );
};

export default LandDetail;
