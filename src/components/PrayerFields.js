import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/UpdateOutlined";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import * as actions from "../redux";


class PrayerFields extends Component {
  state = {
    topic: this.props.data !== null ? this.props.data.topic : "",
    passage: this.props.data !== null ? this.props.data.passage : "",
    message: this.props.data !== null ? this.props.data.message : "",
    prayerPoints:
      this.props.data !== null ? this.props.data.prayerPoints : [""],
  };
  updatePrayerPoint = () => {
    const { addPrayerPoint, _getQueryVariables } = this.props;
    const { topic, passage, message, prayerPoints } = this.state;
    const prop = {
      topic: topic,
      passage: passage,
      message: message,
      prayerPoints: prayerPoints,
    };
    addPrayerPoint({
      day: _getQueryVariables().day,
      editionId: _getQueryVariables().editionId,
      month: _getQueryVariables().month,
      prayer: JSON.stringify(prop),
    });
    window.location.href = `/editions/${_getQueryVariables().editionId}`
    // history.push()
  };
  deletePrayerPoint = (index) => {
    var prayers = this.state.prayerPoints;
    if (index === 0 && prayers.length === 1) {
      prayers[index] = "";
    } else {
      prayers.splice(index, 1);
    }
    this.setState({ prayerPoints: prayers });
  };
  addPrayerPoint = () => {
    this.setState((prevState) => ({
      prayerPoints: [...prevState.prayerPoints, ""],
    }));
  };
  handleTopicChange = (e) => {
    this.setState({ topic: e.target.value });
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handlePassageChange = (e) => {
    this.setState({ passage: e.target.value });
  };
  handlePrayerPointsChange = (e, index) => {
    try {
      let prayers = this.state.prayerPoints;

      prayers[index] = e.target.value;
      this.setState({ prayerPoints: prayers });
      // console.log("index exists", this.state.prayerPoints);
    } catch (error) {
      this.setState((prevState) => ({
        prayerPoints: [...prevState.prayerPoints, e.target.value],
      }));
      // console.log("index does not exist", this.state.prayerPoints);
    }
  };
  render() {
    const { classes } = this.props;
    const { topic, passage, message, prayerPoints } = this.state;

    const disableAddButton =
      this.state.prayerPoints[this.state.prayerPoints.length - 1] === "";
    const isReadyToAdd =
      topic !== "" && passage !== "" && message !== "" && !disableAddButton;
    return (
      <div className="container">
        <Grid
          className={classes.gridContainer}
          direction="row"
          justify="center"
          container
        >
          <Grid xs={12} item align="center">
            <form className={classes.formRoot} noValidate>
              <TextField
                InputLabelProps={{
                  className: classes.multilineColor,
                }}
                InputProps={{
                  className: classes.multilineColor,
                }}
                className={classes.multilineColor}
                multiline
                label="Topic"
                variant="filled"
                fullWidth
                value={topic}
                onChange={this.handleTopicChange}
              />
              <TextField
                InputLabelProps={{
                  className: classes.multilineColor,
                }}
                InputProps={{
                  className: classes.multilineColor,
                }}
                className={classes.multilineColor}
                multiline
                label="Bible Passage"
                variant="filled"
                rows={4}
                fullWidth
                value={passage}
                onChange={this.handlePassageChange}
              />
              <TextField
                InputLabelProps={{
                  className: classes.multilineColor,
                }}
                InputProps={{
                  className: classes.multilineColor,
                }}
                className={classes.multilineColor}
                multiline
                label="Message"
                variant="filled"
                rows={4}
                fullWidth
                value={message}
                onChange={this.handleMessageChange}
              />
              {prayerPoints.map((prayer, index) => (
                <Grid container direction="row" wrap="no-wrap" key={index}>
                  <Grid item xs={1}>
                    <Avatar variant="square" className={classes.prayerNumber}>
                      {index + 1}
                    </Avatar>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      InputLabelProps={{
                        className: classes.multilineColor,
                      }}
                      InputProps={{
                        className: classes.multilineColor,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="remove"
                              onClick={() => this.deletePrayerPoint(index)}
                              disabled={index <= prayerPoints.length - 2}
                            >
                              <Icon
                                className={classes.adormentIcon}
                                fontSize="small"
                              >
                                close
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      disabled={index <= prayerPoints.length - 2}
                      className={classes.multilineColor}
                      multiline
                      label="Prayer Point"
                      id="PrayerPoint"
                      variant="filled"
                      fullWidth
                      type="text"
                      value={prayer}
                      onChange={(e) => this.handlePrayerPointsChange(e, index)}
                    />
                  </Grid>
                  {index + 1 === prayerPoints.length && (
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="add"
                        className={classes.addPrayerIcon}
                        onClick={this.addPrayerPoint}
                        disabled={disableAddButton}
                      >
                        <Icon fontSize="small">add_circle</Icon>
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              ))}
            </form>
          </Grid>
        </Grid>

        <Divider className={classes.dividerError} />
        <Grid container spacing={2}>
          <Grid item xs={6} className={classes.buttonsContainer}>
            <Button
              variant="outlined"
              color="default"
              className={classes.buttonDelete}
              startIcon={<DeleteIcon />}
              fullWidth
              onClick={()=>{this.props.openDeletePrayerDialog(this.props._getQueryVariables().day)}}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonAdd}
              endIcon={this.props.data === null ? <AddIcon /> : <UpdateIcon />}
              fullWidth
              disabled={!isReadyToAdd}
              onClick={this.updatePrayerPoint}
            >
              {this.props.data === null ? "Add" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return {
    addPrayerPoint: (prop) => dispatch(actions.addPrayerPoint(prop)),
  };
};
export default connect(
  null,
  mapActionToProps
)(withRouter(PrayerFields));
