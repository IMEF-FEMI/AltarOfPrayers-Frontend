import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
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
    backgroundColor: "#9e9e9e",
  },
});

export default function EditionsCard(props) {
  const classes = useStyles();
  const months = {
    1: "January - March",
    4: "April - June",
    7: "July - September",
    10: "October - December",
  };

  return (
    <Card className={classes.root} >
      <CardMedia
        className={classes.media}
        image={require("../images/cross.jpg")}
        title={props.edition.name}
      />
      <CardContent className={props.edition.published ? classes.content : ""}>
        <Typography variant="h5" component="h3" align="center">
          {props.edition.name}
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          align="center"
        >
          {months[props.edition.startingMonth.toString()]}
        </Typography>
        <Typography variant="body2" component="p" align="center">
          {props.edition.year}
        </Typography>
      </CardContent>
    </Card>
  );
}
