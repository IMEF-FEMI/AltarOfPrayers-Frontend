import "../../styles/buttons-colorful.css";

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    backgroundColor: "#ebeeee",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "calc(10px + 2vmin)",
    // margin: "1.5rem 0",
  },

  blockquote: {
    paddingTop: "96px",
    paddingBottom: "66px",
    fontFamily: "librebaskerville-italic, serif",
    fontStyle: "italic",
    fontSize: "24px",
    lineHeight: "40px",
  },
  text:{
      textAlign: 'center'
  },
  about: {
    fontFamily: "librebaskerville-italic, serif",
    // color: '#6E7881',
    // color: 'white',
    // fontFamily: "Reem Kufi, sans-serif",

    fontSize: "1.75em",
    fontWeight: "600",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    textAlign: "center",
    borderBottom: "3px solid #11ABB0",
  },
});

const Mission = ({ classes }) => {
  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <h3 className={classes.about}>Mission</h3>
        <div className="container">
          <div className={classes.blockquote}>
            <p className={classes.text}>
              To build a consistent and effective prayer life without struggle
            </p>
            <p className={classes.text}>To set the captive free Restore hope to the hopeless</p>
            <p className={classes.text}>Set many feet on the pedestal of success</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default withStyles(styles)(Mission);
