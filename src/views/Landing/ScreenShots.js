import "../../styles/buttons-colorful.css";

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import screenShots from "../../images/app.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    paddingBottom: theme.spacing(15),
    background: `url(${screenShots})no-repeat center`,
    backgroundSize: 'cover'
  },
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
  },
 
  
});

const ScreenShots = ({ classes }) => {

  return (
    <div className={classes.root}>
      <main className={classes.main}>
          
      </main>
   </div>
  );
};
export default withStyles(styles)(ScreenShots);
