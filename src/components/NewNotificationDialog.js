import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";

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
  const [message, setMessage] = React.useState("");
  const [valid, setValid] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const addNewNotification = () => {
    props.addNotification({ title: title, message: message });
    props.handleClose()
  };
  useEffect(() => {
    const valid =  title !== "" && message !== "";
    setValid(valid);
  }, [title, message]);
  return (
    <div>
      <DialogTitle
        id="form-dialog-title"
        onClose={props.handleClose}
        classes={classes}
      >
        New Notification
      </DialogTitle>
      <DialogContent>
        <TextField
          multiline
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
      
      <TextField
          multiline
          margin="dense"
          id="message"
          label="Message"
          type="text"
          value={message}
          onChange={handleMessageChange}
          fullWidth
          rows={4}
        />
      
        
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addNewNotification} color="primary" disabled={!valid}>
          Add
        </Button>
      </DialogActions>
    </div>
  );
}
const mapActionToProps = (dispatch) => {
  return {
    addNotification: (variables) => {
      dispatch(actions.addNotification(variables));
    },
  };
};

export default connect(
  null,
  mapActionToProps
)(withStyles(styles)(NewEditionDialog));
