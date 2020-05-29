import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../components/Header";
import aboutStyle from "../styles/aboutStyle";
import author_pic from "../images/1.png";

const About = ({ classes }) => {
  return (
    <div id="container" className="container">
      <Header>About The Author</Header>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.padding}>
          <Avatar
            alt="my daughter and I"
            src={author_pic}
            className={classes.avatar}
          />
        </Grid>
        <Grid item className={classes.padding}></Grid>
        <Grid item>
          <Typography variant="body1" className={classes.body}>
            Lorem ipsum dolor sit amet, meliore minimum percipitur ne per, eos
            lobortorquatos contentiones cu. Vero assum viris ne ius, ne mollis
            disputando mel. Ex senserit iracundia nec. Tale oblique mea id,
            exerci delenit no usu. Id vix cetero verear. Cu eum paulo
            platonem.Eum quem prodesset no, sit id tollit tamquam veritus. At
            vis novum dolorum. An usudolor habemus conclusionemque, mei ei mazim
            sententiae, diam commodo assentior melid. Et commune efficiendi
            ullamcorper eos, ad his atqui commodo.{" "}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default withStyles(aboutStyle)(About);
