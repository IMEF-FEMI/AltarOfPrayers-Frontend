import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  formControl: {
    margin: theme.spacing(1),
    // minWidth: window.innerWidth * .63,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});
const DialogTitle = (props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

function NewEditionDialog(props) {
  const { classes } = props;
  const [title, setTitle] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [valid, setValid] = React.useState(false);

  const currentYear = new Date().getFullYear();

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const addNewEdition = () => {
    props.addEdition({ name: title, startingMonth: month, year: year });
    props.handleClose()
  };
  useEffect(() => {
    const valid = month !== "" && year !== "" && title !== "";
    setValid(valid);
  }, [title, month, year]);
  return (
    <div>
      <DialogTitle
        id="form-dialog-title"
        onClose={props.handleClose}
        classes={classes}
      >
        New Edition
      </DialogTitle>
      <DialogContent>
        <TextField
          multiline
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="email"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <Select
          value={month}
          onChange={handleMonthChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
          fullWidth
        >
          <MenuItem value="" disabled>
            Months
          </MenuItem>
          <MenuItem value={1}>January - March</MenuItem>
          <MenuItem value={4}>April - June</MenuItem>
          <MenuItem value={7}>July - September</MenuItem>
          <MenuItem value={10}>October - December</MenuItem>
        </Select>
        <Select
          value={year}
          onChange={handleYearChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
          fullWidth
        >
          <MenuItem value="" disabled>
            Year
          </MenuItem>
          <MenuItem value={currentYear}>{currentYear}</MenuItem>
          <MenuItem value={currentYear + 1}>{currentYear + 1}</MenuItem>
          <MenuItem value={currentYear + 2}>{currentYear + 2}</MenuItem>
          <MenuItem value={currentYear + 3}>{currentYear + 3}</MenuItem>
          <MenuItem value={currentYear + 4}>{currentYear + 4}</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addNewEdition} color="primary" disabled={!valid}>
          Add
        </Button>
      </DialogActions>
    </div>
  );
}
const mapActionToProps = (dispatch) => {
  return {
    addEdition: (variables) => {
      dispatch(actions.addNewEdition(variables));
    },
  };
};

export default connect(
  null,
  mapActionToProps
)(withStyles(styles)(NewEditionDialog));
