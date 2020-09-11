import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    cursor: "pointer",
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
  publishedText: {
    color: "#087f23;",
  },
  unpublishedText: {
    color: "#ff1100;",
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  const months = {
    1: "January - March",
    4: "April - June",
    7: "July - September",
    10: "October - December",
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.edition.photoUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.edition.name}
          </Typography>

          <Typography
            className={classes.pos}
            color="textSecondary"
            variant="h5"
            component="h4"
          >
            {months[props.edition.startingMonth.toString()]}
          </Typography>

          <Typography variant="h5" component="h2">
            {props.edition.year}

            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          className={
            props.edition.published
              ? classes.publishedText
              : classes.unpublishedText
          }
        >
          {props.edition.published ? "Published" : "UnPublished"}
        </Button>
      </CardActions>
    </Card>
  );
}
