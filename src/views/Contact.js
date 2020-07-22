import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import contactStyle from "../styles/contactStyle";
import Header from "../components/Header";
import formFields from "../components/formFields";

const Contact = ({ classes }) => {
  return (
    <div id="container" className="container">
      <Header>Contact Us</Header>
      <Fade in timeout={1500}>
        <Paper className={classes.padding}>
          <form
            action="https://formspree.io/xlepajbv"
            method="POST"
            autoComplete="off"
          >
            <input type="hidden" name="_next" value="/thanks" />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              {formFields.map(
                ({ label, name, placeholder, fieldType, multiline, rows }) => {
                  return (
                    <Grid item key={name} className={classes.padding}>
                      <TextField
                        label={label}
                        type={fieldType}
                        name={name}
                        placeholder={placeholder}
                        multiline={multiline}
                        required
                        fullWidth
                        rows={rows}
                      />
                    </Grid>
                  );
                }
              )}
              <Grid item className={classes.padding}>
                <Button
                  type="submit"
                  variant="raised"
                  size="large"
                  color="secondary"
                  className={classes.button}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Fade>
    </div>
  );
};
export default withStyles(contactStyle)(Contact);
