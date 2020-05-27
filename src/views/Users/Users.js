import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import ReactSpinner from "react-spinjs-fix";
import Backdrop from "@material-ui/core/Backdrop";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import usersStyle from "../../styles/usersStyle";
import UsersSearch from "./UsersSearch";
import UsersMain from "./UsersMain";
import * as actions from '../../redux'

class Users extends Component {
  state = {
    context: "main",
    value: "",
  };
  searchUsers = () => {
    if (this.state.value === "") return;
    // first clear the previous search results
    this.props.clearSearch();
    this.props.fetchUsers({ search: this.state.value }, 'search');
    this.setState({ context: "search" });
  };
  clearSearch = () => {
    this.setState({ context: "main", value: "" });
  };
  onKeyDown = (e) => {
    if (e.key === "Enter" && this.state.value !== "") {
      this.searchUsers();
    }
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { context, value } = this.state;
    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          //   className={classes.modal}
          open={this.props.loading}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          disableEnforceFocus
          disableAutoFocus
          
        >
          <ReactSpinner />
        </Modal>
        <div className="container">
          <Paper className={classes.root}>
            <Input
              className={classes.input}
              disableUnderline
              onChange={this.onChange}
              placeholder="Search"
              onKeyDown={this.onKeyDown}
              endAdornment={
                value === "" ? (
                  <IconButton onClick={this.searchUsers}>
                    <SearchIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  <IconButton onClick={this.clearSearch}>
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                )
              }
            />
          </Paper>
        </div>
        {context === "main" && <UsersMain />}
        {context === "search" && <UsersSearch />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});
const mapActionsToProps = (dispatch) => {
  return {
    fetchUsers: (variables, context) => dispatch(actions.loadUsers(variables, context)),
    clearSearch: () => dispatch(actions.clearUsersSearch()),
  };
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(usersStyle)(Users));
