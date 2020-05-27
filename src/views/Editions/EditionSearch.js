import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import editionsStyle from "../../styles/editionsStyle";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux";
import EditionsCard from "../../components/EditionsCard";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import ReactSpinner from "react-spinjs-fix";
import Dialog from "@material-ui/core/Dialog";
import NewEditionDialog from "../../components/NewEditionDialog";
import BottomScrollListener from "react-bottom-scroll-listener";

class EditionSearch extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      openNewEditionDialog: false,
      searching: false,
    };
  }
  handleClickOpen = () => {
    this.setState({ openNewEditionDialog: true });
  };

  handleClose = () => {
    this.setState({ openNewEditionDialog: false });
  };

  fetchNextPage = () => {
    const { edition, searchKeyword } = this.props;
    const { page, searching } = this.state;

    if (searching || edition.searchEditions.length < 12) return;

    this.props.loadEditions({search: searchKeyword, first: 12, skip: 12 * page });
    this.setState({ page: this.state.page + 1 });
  };
  openEditionDetails = (edition) => {
    const { history } = this.props;
    history.push(`/editions/${edition.id}`);
  };
  render() {
    const { classes, edition, loading } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
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
          <ReactSpinner  />
        </Modal>
        <Dialog
          open={this.state.openNewEditionDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <NewEditionDialog handleClose={this.handleClose} />
        </Dialog>
        
        {edition.searchEditions.length !== 0 && (
          <Grid
            className={classes.gridContainer}
            direction="row"
            wrap="wrap"
            justify="flex-start"
            container
            // spacing={1}
          >
            {edition.searchEditions.map((edition) => (
              <Grid
                item
                key={edition.name}
                className={classes.gridItem}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                xl={3}
                onClick={() => this.openEditionDetails(edition)}
              >
                <EditionsCard edition={edition} />
              </Grid>
            ))}
          </Grid>
        )}
       
        <BottomScrollListener onBottom={this.fetchNextPage} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  edition: state.edition,
  loading: state.loading,
});

const mapActionToProps = (dispatch) => {
  return {
    loadEditions: (cred) => {
      dispatch(actions.loadEditions(cred));
    },
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(editionsStyle)(EditionSearch)));
