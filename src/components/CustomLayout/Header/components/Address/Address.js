const Address = ({ userAddress }) => {
  return (
    <span
      style={{
        backgroundColor: "#e5771b",
        color: "white",
        padding: "5px",
        borderRadius: "5px",
        border: "none",
      }}
    >
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
};

export default Address;
