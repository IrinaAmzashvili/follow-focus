import { Redirect } from "react-router-dom";
import ReactPlayer from 'react-player';
import SplashVideo from '../../videos/countsIdea.mp4';
import styles from './SplashPage.module.css';

const SplashPage = ({ sessionUser }) => {
  if (sessionUser) {
    return <Redirect to="/tutorials" />;
  }
  return (
    <div className={styles.videoDiv}>
      {/* <ReactPlayer
        className={styles.backgroundVideo}
        url={SplashVideo}
        playing={true}
        muted={true}
        loop={true}
        width='100%'
        height='100%'
        controls={false}
      /> */}
      <ReactPlayer
        className={styles.video}
        url={SplashVideo}
        playing={true}
        muted={true}
        loop={true}
        width='100%'
        height='93vh'
        controls={false}
      />
    </div>
  );
};

export default SplashPage;
