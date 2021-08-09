import { useState } from "react";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import { Waypoint } from "react-waypoint";
import { HashLink as Link } from "react-router-hash-link";
import { AiOutlineArrowUp } from "react-icons/ai";
import SplashVideo from "../../videos/countsIdea.mp4";
import styles from "./SplashPage.module.css";

const SplashPage = ({ sessionUser }) => {
  const [topOfPage, setTopOfPage] = useState(true);

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  if (sessionUser) {
    return <Redirect to="/tutorials" />;
  }

  return (
    <>
      <Waypoint bottomOffset='20%' onEnter={() => setTopOfPage(true)} onLeave={() => setTopOfPage(false)}>

      <div className={styles.videoDiv}>
        <ReactPlayer
          className={styles.video}
          url={SplashVideo}
          playing={true}
          muted={true}
          loop={true}
          width="100%"
          height="auto"
          controls={false}
          />
      </div>
      </Waypoint>
      {!topOfPage && (
        <button
          onClick={backToTop}
          className={`link-button icon-button ${styles.backToTopButton}`}
        >
          <Link smooth to="/" exact="true">
            <AiOutlineArrowUp />
          </Link>
        </button>
      )}
    </>
  );
};

export default SplashPage;
