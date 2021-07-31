import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneTutorial, unloadCurrentTutorial } from "../../store/tutorials";
import EditTutorial from '../EditTutorial';
import DeleteTutorial from '../DeleteTutorial';
import styles from "./IndividualTutorialPage.module.css";

const IndividualTutorialPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tutorial = useSelector((state) => state.tutorials.current);
  const isLoaded = useSelector((state) => state.tutorials.loaded);

  useEffect(() => {
    dispatch(getOneTutorial(id));
    return () => dispatch(unloadCurrentTutorial())
  }, [dispatch, id]);

  useEffect(() => {
  }, [isLoaded])


  return (isLoaded ? (tutorial ?
    (<div className={styles.tutorialPageDiv}>
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
        <div className={styles.actionButtonsDiv}>
          <EditTutorial />
          <DeleteTutorial linkText={<i className={`${styles.deleteIcon} fas fa-trash`}></i>} />
        </div>
        <div className={styles.tutorialInfo}>
          <h1 className={styles.title}>{tutorial?.title}</h1>
          <p className={styles.description}>{tutorial?.description}</p>
        </div>
      </div>
    </div>) :
      <h1>This tutorial doesn't exist.</h1>)
      : (
        <h4>Loading...</h4>

      )
  );
};

export default IndividualTutorialPage;
