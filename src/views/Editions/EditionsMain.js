import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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

class Editions extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      openNewEditionDialog: false,
    };
  }
  handleClickOpen = () => {
    this.setState({ openNewEditionDialog: true });
  };

  handleClose = () => {
    this.setState({ openNewEditionDialog: false });
  };
  componentDidMount() {
    if (this.props.edition.initialFetch === true) {
      this.props.loadEditions({ first: 12 });
      this.props.setInitialFetch(false);
    }
  }

  fetchNextPage = () => {
    const { edition } = this.props;
    const { page } = this.state;

    if (
      edition.initialFetch ||
      edition.isFetching ||
      edition.editions.length >= edition.count
    )
      return;

    this.props.setInitialFetch(false);
    this.props.loadEditions({ first: 12, skip: 12 * page });
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
          open={this.props.loading}
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
        <div className="container">
          {edition.editions.length === 0 && !loading && (
            <Grid xs={12} item align="center" className={classes.noEdition}>
              <Typography variant="h4" className={classes.noEditionText}>
                No new Edition has been added yet
              </Typography>
            </Grid>
          )}
        </div>
        
        {edition.editions.length !== 0 && (
          <Grid
            className={classes.gridContainer}
            direction="row"
            wrap="wrap"
            justify="flex-start"
            container
            // spacing={1}
          >
            {edition.editions.map((edition) => (
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
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
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
    setInitialFetch: (value) => dispatch(actions.setInitialFetch(value)),
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(editionsStyle)(Editions)));
