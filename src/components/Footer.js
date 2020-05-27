import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import footerStyle from "../styles/footerStyle";
import social from "../routes/social";

const Footer = ({ classes, links }) => {
  return (
    <div>
      <Slide in direction="up" timeout={700}>
        <footer className={classes.footer}>
          <Grid container justify="space-around">
            <Grid item>
              {social.map((route, key) => {
                return (
                
                  <a href={route.path} target="_blank" rel="noopener noreferrer">
                    {route.name}
                  </a>
                );
              })}
            </Grid>
            <Grid item>
              {links.map((route, key) => {
                return !route.hidden ? (
                  <Link
                    key={key}
                    to={route.path}
                    className={classNames(classes.link, classes.padding)}
                  >
                    {route.name}
                  </Link>
                ) : (
                  ""
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} align="center">
            <Typography variant="caption" style={{ textAlign: "center" }}>
              © {new Date().getFullYear()}. Altar of Prayers
            </Typography>
          </Grid>
        </footer>
      </Slide>
    </div>
  );
};

export default withStyles(footerStyle)(Footer);
