import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { customContract } from "../../contracts/contractUtils";
import { UserContext } from "../../App";
import { Container } from "@mui/material";

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
}

const SublandDetail = () => {
  const history = useLocation();
  const { userAddress, contractWithSigner } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [sublandInfo, setSublandInfo] = useState(null);
  const [owner, setOwner] = useState(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [authorizeField, setAuthorizeField] = useState({
    address: null,
    until_date: null,
    until_time: null,
  });

  const checkUrlType = (url) => {
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg|html|com)$/.test(url)) {
      console.log("here: ");
      setCurrentUrl("https://threejs.org/examples/css3d_youtube.html");
      // setCurrentUrl(url);
    }
  };

  const isAuthorized = (address) => {
    if (sublandInfo === null) {
      return false;
    }
    if (
      sublandInfo.authorized_address ===
      "0x0000000000000000000000000000000000000000"
    ) {
      return false;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return (
      address === sublandInfo.authorized_address &&
      currentTimestamp <= sublandInfo.authorized_until
    );
  };

  useEffect(() => {
    console.log("userAddress: ", userAddress);
    console.log("contract: ", contractWithSigner);

    setIsLoading(true);
    try {
      customContract
        .sublands(history.state.mainLandId, history.state.sublandId)
        .then((response) => {
          if (response.url) {
            checkUrlType(response.url);
          }
          setSublandInfo(response);
        });
      console.log("mainlandId", history.state.mainLandId);
      customContract.ownerOf(history.state.mainLandId).then((ownerAddress) => {
        setOwner(ownerAddress.toLowerCase());
        console.log("owner", owner);
        console.log("user", userAddress);
        console.log(owner === userAddress);
      });
      console.log("sublandInfo", sublandInfo);
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [history.state.mainLandId, history.state.sublandId, isLoading]);

  const transactionHandle = async (tx, message) => {
    console.log("Tx sent");
    try {
      await tx.wait();
      console.log("Mined");
      setIsLoading(true);
      alert(message);
    } catch (e) {
      alert(`An exception occurred ${e}`);
    }
  };
  const handleNameChange = async (event) => {
    event.preventDefault();
    const tx = await contractWithSigner.updateSublandName(
      history.state.mainLandId,
      history.state.sublandId,
      name
    );
    await transactionHandle(tx, "Land Name Updated");
  };
  const handleUrlChange = async (event) => {
    event.preventDefault();
    const tx = await contractWithSigner.updateSublandURL(
      history.state.mainLandId,
      history.state.sublandId,
      url
    );
    await transactionHandle(tx, "Land Url Updated");
  };

  const handleAuthorize = async (event) => {
    event.preventDefault();
    console.log("authorizeField", authorizeField);
    const dateString =
      authorizeField.until_date + "T" + authorizeField.until_time;
    const untilTimestamp = Math.floor(Date.parse(dateString) / 1000);
    console.log("dateString", dateString);
    console.log("parsed", untilTimestamp);
    console.log();
    const tx = await contractWithSigner.authorizeSubland(
      history.state.mainLandId,
      history.state.sublandId,
      authorizeField.address,
      untilTimestamp
    );
    await transactionHandle(
      tx,
      `Subland authorized to ${authorizeField.to} until ${timeConverter(
        untilTimestamp
      )}`
    );
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <Container>
      {sublandInfo !== null && (
        <div>
          <p>Name: {sublandInfo.name}</p>
          <p>Url: {sublandInfo.url}</p>
          {isAuthorized(sublandInfo.authorized_address) && (
            <div>
              <p>Authorized Address: {sublandInfo.authorized_address}</p>
              <p>
                Authorized Until: {timeConverter(sublandInfo.authorized_until)}
              </p>
            </div>
          )}
        </div>
      )}
      {owner !== null && <p>Owner: {owner}</p>}
      {currentUrl && (
        <iframe
          style={{
            display: "flex",
            justiftyContent: "center",
            borderRadius: "50px",
          }}
          name='I1'
          title={currentUrl}
          id='if1'
          src={currentUrl}
          width='100%'
          height='800'
          allowFullScreen
        ></iframe>
      )}
      {(userAddress === owner || isAuthorized(userAddress)) && (
        <div>
          <form onSubmit={handleNameChange}>
            <label>
              Change Subland Name:
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type='submit' />
          </form>
          <form onSubmit={handleUrlChange}>
            <label>
              Change Subland URL:
              <input
                type='text'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
            <input type='submit' />
          </form>
        </div>
      )}
      {owner === userAddress && (
        <form onSubmit={handleAuthorize}>
          <label>
            Authorize this land:
            <input
              type='text'
              placeholder='address'
              value={authorizeField.address}
              onChange={(e) =>
                setAuthorizeField({
                  ...authorizeField,
                  address: e.target.value,
                })
              }
            />
            <input
              type='date'
              placeholder='date'
              value={authorizeField.until_date}
              onChange={(e) =>
                setAuthorizeField({
                  ...authorizeField,
                  until_date: e.target.value,
                })
              }
            />
            <input
              type='time'
              placeholder='time'
              value={authorizeField.until_time}
              onChange={(e) =>
                setAuthorizeField({
                  ...authorizeField,
                  until_time: e.target.value,
                })
              }
            />
          </label>
          <input type='submit' />
        </form>
      )}
    </Container>
  );
};

export default SublandDetail;
