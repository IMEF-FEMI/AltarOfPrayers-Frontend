import React, { Component } from "react";
import Heading from "./Heading";
import Mission from "./Mission";
import Testimonials from "./Testimonials";
import About from "./About";
import ScreenShots from "./ScreenShots";
import Hidden from "@material-ui/core/Hidden";

class Landing extends Component {
  render() {
    return (
      <div>
        <Heading />
        <Hidden smDown>
          <ScreenShots />
        </Hidden>
        <About />
        <Mission />
        <Testimonials />
      </div>
    );
  }
}

export default Landing;
