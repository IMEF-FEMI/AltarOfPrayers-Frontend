import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    minWidth: 275,
    cursor: "pointer",
    borderRadius: '12px'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 100,
  },
  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
});

function EditionCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h3" component="h3" align="center">
          {props.month}
        </Typography>
        <Typography variant="h4" component="h3" align="center">
          {props.year}
        </Typography>
        <Typography variant="body1" component="p" align="center">
         {props.daysCompleted} out of {props.daysInMonth}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(useStyles)(EditionCard);
