import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    minHeight: "120vh",
  },
  methodIcon: {
    height: 30,
    marginLeft: "4px",
    marginRight: "4px",
  },
  cardContainer: {
    paddingBottom: "4px",
    paddingTop: "4px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "4px",
  },
  cardContent: {
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    minHeight: 800,
  },
  currentMethodIcon: {
    height: 40,
    "& > img": {
      width: "auto",
      maxHeight: "100%",
    },
  },
}));

export default useStyles;
