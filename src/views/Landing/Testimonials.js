import "../../styles/buttons-colorful.css";

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  blockquote: {
    borderLeft: "none",
  },
});

const Testimonials = ({ classes }) => {
  return (
    <div>
      <section id="testimonials">
        <div className="text-container">
          <div className="container">
        <h1 >Testimonies</h1>

            <ul className="slides">
              <li>
                <blockquote className={classes.blockquote}>
                  <p>
                    Altar of prayer has made me to know both sides of
                    christianity, that is: to be harmless ass a dove and to be
                    wise as a serpent, It has also changed my prayer life how to
                    be defensive and also offensive. Since i came in contact
                    with altar of prayers through Pastor Bolaji Isaac, I have
                    recommended it to all my church members and friends at all
                    cost for them to know and enjoy the Benefits. Altar of
                    Prayers is a great spoil in the hand of its users, and also
                    a treasure to anyone using it for morning devotion. I
                    therefore recommend it to you to get your own copy and for
                    others as well every quarter
                  </p>
                  <cite>Pastor Samuel E.O Mietehe</cite>
                </blockquote>
              </li>
              <li>
                <blockquote className={classes.blockquote}>
                  <p>
                    I came across Altar of Prayer in June 2013 at MFM bookshop
                    Akure Ondo State and since then, the book has helped me and
                    my family on daily warfare and prophetic declaration. At the
                    End of September 2013, i decided to find out how to get more
                    copies and let other people benefit from the blessing. God
                    helped me i was able to get to the producer. now we have
                    alot of family and friends that are enjoying it and have
                    been coming to share testimonies with uss of what God has
                    done for them like healing, promotion in the work place and
                    other family prolems solved in divine ways using this book.
                    I recommend this book to anyone who will not want his or her
                    life to be altared but to be on fire for God. So glad to
                    have come across this book. Pray that the presence and Glory
                    of our lord will continue to be upon our Pastor J.S. Akande
                    in Jesus name
                  </p>
                  <cite>
                    Bro {"&"} Sis. Johnson A. Ayegbusi <br/> Uyo, Akwa Ibom
                    State
                  </cite>
                </blockquote>
              </li>
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
                    Altar of prayer is indeed an instrument of spiritual power,
                    a welfare stimulant for victors and guide for winning
                    unknown battles. i recommend it to all who must win their
                    spiritual warfare on daily basis
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
