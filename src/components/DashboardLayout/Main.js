import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "@material-ui/styles/useTheme";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Sidebar  from "./Sidebar";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
  },
}));

const Main = (props) => {
  const { children } = props;
  const classes = useStyle();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      {/* <Sidebar
        open={isDesktop}
        variant={isDesktop ? "persistent" : "temporary"}
      /> */}
      <main className={classes.content}>{children}</main>
    </div>
  );
};
export default Main;
