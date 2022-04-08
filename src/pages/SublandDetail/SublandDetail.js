import { useLocation } from "react-router-dom";

const SublandDetail = () => {
  const history = useLocation();

  console.log("location: ", history.state);

  

  return <p>sadasd</p>;
};

export default SublandDetail;
