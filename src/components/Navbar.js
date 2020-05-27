import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import NavbarLink from "./NavbarLink";
import navbarStyle from "../styles/navbarStyle";
import { connect } from "react-redux";
import * as actions from "../redux";
import Input from "@material-ui/icons/Input";

class Navbar extends Component {
  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({ open: open });
  };

  renderGuestLinks() {
    const { guestLinks } = this.props;
    return guestLinks.map((route, key) => {
      return !route.hidden ? <NavbarLink key={key} {...route} /> : "";
    });
  }
  renderAdminLinks() {
    const { adminLinks } = this.props;
    return adminLinks.map((route, key) => {
      return !route.hidden ? <NavbarLink key={key} {...route} /> : "";
    });
  }
  logoutButton() {
    const { logout, classes } = this.props;
    return (
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={logout}
      >
        <Input />
      </IconButton>
    );
  }
  render() {
    const { classes, auth } = this.props;
    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.container}>
            <div className={classes.flex}>
              <Typography component={Link} to="/" variant="h6" color="inherit">
                Altar Of Prayers
              </Typography>
            </div>
            <div className={classes.flexEnd}>
              <Hidden smDown>
                {!auth.isAuthenticated && this.renderGuestLinks()}
                {/* {auth.isAuthenticated && this.renderAdminLinks()} */}
              </Hidden>
              <Hidden smDown>
                {auth.isAuthenticated && this.renderAdminLinks()}
              </Hidden>

              {/* hidden to small screens downward */}
              <Hidden smDown>
                {auth.isAuthenticated && this.logoutButton()}
              </Hidden>
              {/* hidden to medium screens upwards */}
              <Hidden mdUp>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer(true)}
                >
                  <Menu />
                </IconButton>
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="top"
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
        >
          <div
            className={classes.drawer}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {!auth.isAuthenticated && this.renderGuestLinks()}
            {auth.isAuthenticated && this.renderAdminLinks()}
            {auth.isAuthenticated && this.logoutButton()}
            <IconButton
              color="inherit"
              aria-label="Close"
              className={classes.closeButton}
            >
              <Close />
            </IconButton>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
});
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(navbarStyle)(Navbar)));
