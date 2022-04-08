import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Toolbar,
} from "@mui/material";

import useStyles from "./CustomLayout.style";
import Header from "./Header";

const CustomLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container
        className={classes.cardContainer}
        maxWidth='lg'
        data-testid='CustomLayoutContainer'
      >
        {/* <Box className={classes.logoContainer}>
          <RouterLink to='/'>
            <div>sadasd</div>
          </RouterLink>
        </Box> */}
        <AppBar
          enableColorOnDark
          position='fixed'
          color='inherit'
          elevation={0}
          sx={{
            bgcolor: "#2c2c2c",
          }}
        >
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>
        <Card sx={{ marginTop: 10 }}>
          <CardContent className={classes.cardContent}>{children}</CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CustomLayout;
