import "../../styles/buttons-colorful.css";

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({

  blockquote: {
      borderLeft: 'none'
},
});

const Testimonials = ({ classes }) => {
  return (
    <div >
      <section id='testimonials'>
        <div className="text-container">
            <div className="container">
              <ul className="slides">
                <li>
                  <blockquote className={classes.blockquote}>
                    <p>
                      Altar of prayer is a DYNAMIC DAILY PRAYER GUIDE that have
                      mended homes, raise altar of fire in homes, turn people to
                      fire brand 4 Christ. I recommend it to you
                    </p>
                    <cite>REV. DR PIUS AKINOLA</cite>
                  </blockquote>
                </li>
                <li>
                  <blockquote>
                    <p>
                      Altar of prayer is indeed an instrument of spiritual
                      power, a welfare stimulant for victors and guide for
                      winning unknown battles. i recommend it to all who must
                      win their spiritual warfare on daily basis
                    </p>
                    <cite>PST. CHUX .V. UZOMA</cite>
                  </blockquote>
                </li>
              </ul>
            </div>
        </div>
      </section>
    </div>
  );
};
export default withStyles(styles)(Testimonials);
