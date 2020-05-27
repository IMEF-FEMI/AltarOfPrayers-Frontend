import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    // paddingBottom: '118px'
  },
  content: {
    paddingTop: 50,
    textAlign: "center",
  },
  text:{
      // color:theme.palette.white
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1" className={classes.text}>
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2" className={classes.text}>
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
