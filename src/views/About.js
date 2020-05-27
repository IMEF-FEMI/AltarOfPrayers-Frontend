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
        <Grid item className={classes.padding}>
        </Grid>
        <Grid item>
              <Typography variant="body1" className={classes.body}>
                I'm Dustin Atwood, a Software Engineer with a passion for
                programming I love to learn and discover all things Ruby,
                Javascript, HTML and CSS. I found coding a great way to express
                myself. With technology always moving forward and continually
                changing, I am always learning about the new trends and staying
                up to date in the lastest releases. When I'm not writing code, I
                enjoy cooking attending concerts traveling and spending time
                with my daughter in the great outdoors 🏔
              </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default withStyles(aboutStyle)(About);
