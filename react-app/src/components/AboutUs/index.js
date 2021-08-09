import { useEffect } from 'react';
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  // navigate to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="about-us" className={styles.aboutUsDiv}>
      <div>
        <h2>Learn to take ownership of your body, creativity and movement!</h2>
        <p>
          If you are a Lindy Hop or Swing Dance follow and are beginner + or
          above, this is the place for you! If you have no Swing/Lindy Hop/Jazz
          dance experience, it's ok! Everything we teach is broken down and
          there are beginner videos available to catch up with.
        </p>
      </div>
      <div>
        <ul className={styles.list}>
          What to expect:
          <li> Lindy Hop Drills/Technique/Styling</li>
          <li> Historical Clip Breakdowns</li>
          <li> Choreography</li>
          <li>
            {" "}
            Featured Swing Dances: Carolina Shag & Balboa (open to requests for
            more)
          </li>
          <li> Private Video Coaching</li>
        </ul>
      </div>
      <div>
        <h2>The Creators</h2>
        <p>
          We are sisters who travel worldwide teaching Swing and Jazz dancing
          and have 20 years of experience between the two of us. Through the
          years, we have developed and refined a series of drills and techniques
          with the focus on not only strengthening our skills as follows, but as
          individual dancers as well. What we have discovered is that you can
          have all the freedom and power that you want in your role as a follow!
        </p>
        <p>
          Although this website is follow focused, the content is useful for
          leaders and solo dancers as well; we will be covering a lot of
          vernacular jazz content and general rhythm/movement technique so if
          you are not a primary follow, we still recommend you join!
        </p>
      </div>
      <div>
        <h2>Our Commitment</h2>
        <p>
          We recognize that teaching a Black art form and dancing to Black music
          is an enormous privilege (Vernacular Jazz is rooted in African
          American culture). In order to show our solidarity with the Black
          communities and families still suffering from institutional and
          systemic racism as well as the Black Swing dancers of our global
          community, we will be donating a percentage of each Follow Focus
          pledge to either a Black civil rights initiative or the Black Lindy
          Hoppers Fund, a new independent program initiated by the Frankie
          Manning Foundation. #blacklivesmatter
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
