import React, { Component } from "react";
import EditionsMain from "./EditionsMain";
import EditionSearch from "./EditionSearch";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Input from "@material-ui/core/Input";
import withStyle from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import ReactSpinner from "react-spinjs-fix";
import Backdrop from "@material-ui/core/Backdrop";
import * as actions from "../../redux";

const style = (theme) => ({
  root: {
    borderRadius: "4px",
    alignItems: "center",
    padding: theme.spacing(1),
    display: "flex",
    flexBasis: 420,
    marginTop: theme.spacing(3),
  },
  input: {
    flexGrow: 1,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "-0.05px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
});
class Editions extends Component {
  state = {
    value: "",
    context: "main",
  };
  onKeyDown = (e) => {
    if (e.key === "Enter" && this.state.value !== "") {
      this.searchEditions();
    }
  };

  searchEditions = () => {
    if (this.state.value === "") return;
    // first clear the previous search results
    this.props.clearSearch();
    this.props.searchEditions({ search: this.state.value, first: 12 });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  clearSearch = () => {
    this.setState({ context: "main", value: "" });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.edition.searchEditions.length !== 0) {
      if (
        this.props.edition.searchEditions.length !==
        prevProps.edition.searchEditions.length
      ) {
        this.setState({ context: "search" });
      }
    }
  }
  render() {
    const { classes, loading } = this.props;
    const { context, value } = this.state;
    return (
      <div>
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
                  <IconButton onClick={this.searchEditions}>
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
        {
          <Modal
            aria-labelledby="prayer-page-title"
            aria-describedby="prayer-page-description"
            className={classes.modal}
            open={loading}
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
        }
        {context === "main" && <EditionsMain />}
        {context === "search" && (
          <EditionSearch searchKeyword={this.state.value} />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  edition: state.edition,
});
const mapActionToProps = (dispatch) => {
  return {
    searchEditions: (cred) => dispatch(actions.loadEditions(cred, "search")),
    clearSearch: () => dispatch(actions.clearSearch()),
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyle(style)(Editions));
