import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../components/Header";
import aboutStyle from "../styles/aboutStyle";
import author_pic from "../images/1.png";

const About = ({ classes }) => {
  return (
    <div id="container" className="container">
      <Header>About The Author</Header>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.padding}>
          <Avatar
            alt="my daughter and I"
            src={author_pic}
            className={classes.avatar}
          />
        </Grid>
        <Grid item className={classes.padding}></Grid>
        <Grid item>
          <Typography variant="body1" className={classes.body}>
            Pastor James S. Akande is a minister of the Gospel, who i called
            with a specific instruction from God to salvage His people and make
            captains out of captives. {"\n"}
            He has presented in this package a daily devotional prayers with
            prophetic declaration that can build a consistent and effective
            prayer life without struggle. His teachings and minitration have set
            captives free, restored hope to the hopeless and set many feet on
            the pedestal of success. He is the General overseer of COVENANT OF
            RESTORATION MINISTRIES (City of Truth), he is happily married to
            Lara and they are blessed with four children Salem, Gospel, Shammah
            and Great King
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default withStyles(aboutStyle)(About);
