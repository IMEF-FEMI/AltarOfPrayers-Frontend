import React, {forwardRef} from "react";
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from "clsx";

import makeStyles from "@material-ui/styles/makeStyles";

import PeopleIcon from "@material-ui/icons/People";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },

  sideNavRoot: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.white,
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.secondary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const Sidebar = (props) => {
  const { open, variant, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <List
          //   {...rest}
          className={clsx(classes.sideNavRoot, classes.nav)}
        >
          <ListItem className={classes.item} disableGutters key={"Editions"}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={"/editions"}
            >
              <div className={classes.icon}>{<TextFieldsIcon />}</div>
              {'Editions'}
            </Button>
          </ListItem>
          <Divider className={classes.divider} />

          <ListItem className={classes.item} disableGutters key={"users"}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={"/users"}
            >
              <div className={classes.icon}>{<PeopleIcon />}</div>
              {'Users'}
            </Button>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
