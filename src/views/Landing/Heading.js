import "../../styles/buttons-colorful.css";

import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import playStore from "../../images/icons/google-play.svg";
// import appStore from "../../images/icons/apple-store.svg";
import Typist from "react-typist";

import PrayerImg from "../../images/prayer-dark.jpg";
// import PrayerImg from "../../images/prayer-light.jpg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    paddingBottom: theme.spacing(15),
    background: `url(${PrayerImg})no-repeat center fixed`,
    backgroundSize: 'cover'
  },
  main: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
  },
  // storeButtons:{
  //   marginTop: theme.spacing(3)
  // },
  storeButton:{
    padding: theme.spacing(1)
  },
  tagline: {
    fontSize: "1.5rem",
    margin: "1.5rem 0",
    fontWeight: "100",
    marginLeft: "1.5em",
    marginRight: "1.5em",
    color: "white",
    textAlign: 'center'
  },
  intro: {
    fontFamily: "Reem Kufi, sans-serif",
    fontSize: "2.75em",
    fontWeight: "600",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    color: "white",
    textAlign: 'center'
  },
});

const Heading = ({ classes }) => {

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <h1 className={classes.intro}>Altar Of Prayers</h1>
        <div className={classes.tagline}>
          <Typist>{"A Dynamic Daily Prayer Guide"}</Typist>
          <h6>By</h6>
          <h5>Pst J.S. Akande</h5>
        </div>
        <Grid container justify="center" className={classes.storeButtons}>
        {/* <Grid item className={classes.storeButton}>
          <div className="button-row">
            <a href="http://play.google.com" className="real-button-store">
              <span className="badge-store">
                <img className="" alt="apple-store" src={appStore} />
              </span>
              <span className="min-text">Download on the</span>
              <span className="caption">App Store</span>
            </a>
          </div>
        </Grid> */}
        <Grid item className={classes.storeButton}>
          <div className="button-row">
            <a href="https://github.com/IMEF-FEMI/AltarOfPrayers-Mobile/raw/master/ss/app.apk" className="real-button-store">
              <span className="badge-store">
                <img className="" alt="google-play" src={playStore} />
              </span>
              <span className="min-text">Get it on</span>
              <span className="caption">Google Play</span>
            </a>
          </div>
        </Grid>
      </Grid>
      </main>
   </div>
  );
};
export default withStyles(styles)(Heading);
