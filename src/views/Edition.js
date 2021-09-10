import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from "@material-ui/core/Modal";
import ReactSpinner from "react-spinjs-fix";
import * as actions from "../redux";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import editionStyle from "../styles/editionStyle";
import { Query } from "react-apollo";
import { edition as editionQuery } from "../graphql/query_mutation";
import EditionCard from "../components/EditionCard";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
// import RefreshIcon from "@material-ui/icons/Refresh";
import EditEditionDialog from "../components/EditEditionDialog";
import DeleteEditionDialog from "../components/DeleteEditionDialog";
import PrayerDaysDialog from "../components/PrayerDaysDialog";
import PublishEditionDialog from "../components/PublishEditionDialog";

class Edition extends Component {
  state = {
    open: false,
    dialog: "",
    month: 0,
    daysInMonth: 0,
  };
  _getQueryVariables = () => {
    const editionId = parseInt(this.props.match.params.edition);
    return { id: editionId };
  };
  handleClickDeleteOpen = () => {
    this.setState({ open: true, dialog: "delete" });
  };
  handleClickPublishOpen = () => {
    this.setState({ open: true, dialog: "publish" });
  };

  retryPage = (refetch, error) => {
    const { classes } = this.props;

    return (
      <div className="container">
        <Grid xs={12} item align="center">
          <Typography variant="h4" className={classes.retryText}>
            {error.split(":")[1]}
          </Typography>
        </Grid>
        <Divider className={classes.dividerRetry} />
        {/* <Grid container align="center">
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonRetry}
              endIcon={<RefreshIcon />}
              onClick={()=> refetch()}
              // fullWidth
            >
              Retry
            </Button>
          </Grid>
        </Grid> */}
      </div>
    );
  };
  loadMonths = (data) => {
    const daysCompleted = () => {
      const daysCompletedInMonthOne = data.edition.monthOne.filter(
        (prayer) => prayer !== null
      ).length;
      const daysCompletedInMonthTwo = data.edition.monthTwo.filter(
        (prayer) => prayer !== null
      ).length;
      const daysCompletedInMonthThree = data.edition.monthThree.filter(
        (prayer) => prayer !== null
      ).length;

      return {
        monthOne: daysCompletedInMonthOne,
        monthTwo: daysCompletedInMonthTwo,
        monthThree: daysCompletedInMonthThree,
        total:
          daysCompletedInMonthOne +
          daysCompletedInMonthTwo +
          daysCompletedInMonthThree,
      };
    };

    const monthOne = new Date(data.edition.year, data.edition.startingMonth, 0);
    const monthTwo = new Date(
      data.edition.year,
      data.edition.startingMonth + 1,
      0
    );
    const monthThree = new Date(
      data.edition.year,
      data.edition.startingMonth + 2,
      0
    );
    const isReadyToPublish =
      daysCompleted().total ===
      monthOne.getDate() + monthTwo.getDate() + monthThree.getDate();

    // monthOne.getDate() to get days
    const handleClose = () => {
      this.setState({ open: false });
    };

    const handleClickEditOpen = () => {
      this.setState({ open: true, dialog: "edit" });
    };

    const handleClickPrayersOpen = (month, daysInMonth) => {
      this.setState({
        open: true,
        dialog: "prayers",
        month: month,
        daysInMonth: daysInMonth,
      });
    };
    const updateCacheAfterUpdate = (store) => {
      const data = store.readQuery({
        query: editionQuery,
        variables: this._getQueryVariables(),
      });
      store.writeQuery({ query: editionQuery, data });
      this.props.updateEdition(data);
      // this.props.history.push("/editions");
    };
    const updateCacheAfterDelete = (editionId) => {
      this.props.deleteteEdition(editionId);
      this.props.history.push("/editions");
    };

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {this.state.dialog === "edit" && (
            <EditEditionDialog
              editionId={data.edition.id}
              name={data.edition.name}
              photoUrl={data.edition.photoUrl}
              startingMonth={data.edition.startingMonth}
              year={data.edition.year}
              handleClose={handleClose}
              updateStoreAfterEditionUpdate={updateCacheAfterUpdate}
            />
          )}

          {this.state.dialog === "delete" && (
            <DeleteEditionDialog
              editionId={data.edition.id}
              name={data.edition.name}
              handleClose={handleClose}
              updateStoreAfterEditionDelete={updateCacheAfterDelete}
            />
          )}
          {this.state.dialog === "publish" && (
            <PublishEditionDialog
              name={data.edition.name}
              editionId={this._getQueryVariables().id}
              handleClose={handleClose}
              updateStoreAfterPublishEdition={updateCacheAfterUpdate}
            />
          )}
          {this.state.dialog === "prayers" && (
            <PrayerDaysDialog
              edition={data.edition}
              month={this.state.month}
              daysInMonth={this.state.daysInMonth}
            />
          )}
        </Dialog>
        <Grid
          className={classes.gridContainer}
          direction="row"
          wrap="wrap"
          justify="center"
          container
        >
          <Grid xs={12} item align="center">
            <Typography variant="h4">
              {data.edition.name}

              <IconButton aria-label="edit" onClick={handleClickEditOpen}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Typography>
          </Grid>
          <Grid
            item
            key={monthOne.toLocaleString("default", { month: "long" })}
            className={classes.gridItem}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
            onClick={() => handleClickPrayersOpen(0, monthOne.getDate())}
          >
            <EditionCard
              name={data.edition.name}
              month={monthOne.toLocaleString("default", { month: "long" })}
              year={data.edition.year}
              daysCompleted={daysCompleted().monthOne}
              daysInMonth={monthOne.getDate()}
            />
          </Grid>
          <Grid
            item
            key={monthTwo.toLocaleString("default", { month: "long" })}
            className={classes.gridItem}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
            onClick={() => handleClickPrayersOpen(1, monthTwo.getDate())}
          >
            <EditionCard
              month={monthTwo.toLocaleString("default", { month: "long" })}
              year={data.edition.year}
              daysCompleted={daysCompleted().monthTwo}
              daysInMonth={monthTwo.getDate()}
            />
          </Grid>
          <Grid
            item
            key={monthThree.toLocaleString("default", { month: "long" })}
            className={classes.gridItem}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
            onClick={() => handleClickPrayersOpen(2, monthThree.getDate())}
          >
            <EditionCard
              name={data.edition.name}
              month={monthThree.toLocaleString("default", { month: "long" })}
              year={data.edition.year}
              daysCompleted={daysCompleted().monthThree}
              daysInMonth={monthThree.getDate()}
            />
          </Grid>
        </Grid>
        <div className="container">
          <Divider className={classes.divider} />
          <Grid container spacing={2}>
            <Grid
              item
              xs={data.edition.published === false ? 6 : 12}
              className={classes.buttonsContainer}
            >
              <Button
                variant="outlined"
                color="default"
                className={classes.buttonDelete}
                startIcon={<DeleteIcon />}
                fullWidth
                onClick={this.handleClickDeleteOpen}
              >
                Delete
              </Button>
            </Grid>
            {data.edition.published === false && (
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonPublish}
                  endIcon={<SendIcon />}
                  fullWidth
                  disabled={!isReadyToPublish}
                  onClick={this.handleClickPublishOpen}
                >
                  Publish
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Query query={editionQuery} variables={this._getQueryVariables()}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading || networkStatus === 4) {
              this.props.setLoading(true);
              return (
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
                  <ReactSpinner />
                </Modal>
              );
            }
            if (error) {
              this.props.setLoading(false);
              return this.retryPage(refetch, error.message);
            }
            if (data) {
              this.props.setLoading(false);
              return this.loadMonths(data);
            }
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});
const mapActionToProps = (dispatch) => {
  return {
    setLoading: (value) => dispatch(actions.setLoading(value)),
    updateEdition: (edition) => dispatch(actions.updateEdition(edition)),
    deleteteEdition: (editionId) => dispatch(actions.deleteEdition(editionId)),
  };
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(withStyles(editionStyle)(Edition)));
