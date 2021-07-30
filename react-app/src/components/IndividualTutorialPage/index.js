import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneTutorial } from "../../store/tutorials";
import EditTutorial from '../EditTutorial';
import styles from "./IndividualTutorialPage.module.css";

const IndividualTutorialPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tutorial = useSelector((state) => state.tutorials[id]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (tutorial) setIsLoaded(true)
  }, [tutorial])

  useEffect(() => {
    dispatch(getOneTutorial(id));
  }, [dispatch, id]);

  if (!isLoaded) {
    return null
  }

  return (
    <div className={styles.tutorialPageDiv}>
      <div className={styles.tutorialDiv}>
        <div className={styles.videoDiv}>
          <iframe
            className={styles.video}
            width="560"
            height="315"
            src={tutorial?.videoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.tutorialInfo}>
          <h1 className={styles.title}>{tutorial?.title}</h1>
          <p className={styles.description}>{tutorial?.description}</p>
        </div>
        <EditTutorial tutorial={tutorial}/>
      </div>
    </div>
  );
};

export default IndividualTutorialPage;
