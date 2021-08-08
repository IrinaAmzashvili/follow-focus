import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/loading-dots-in-yellow.json";
import { getOneTutorial, unloadCurrentTutorial } from "../../store/tutorials";
import EditTutorial from "../EditTutorial";
import DeleteTutorial from "../DeleteTutorial";
import Comments from "../Comments";
import styles from "./IndividualTutorialPage.module.css";

const IndividualTutorialPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const tutorial = useSelector((state) => state.tutorials.current);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTutorial = async () => {
      await dispatch(getOneTutorial(id));
      setIsLoaded(true);
    };
    fetchTutorial();
    return () => dispatch(unloadCurrentTutorial());
  }, [dispatch, id]);

  // for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return isLoaded ? (
    tutorial ? (
      <div className={styles.tutorialPageDiv}>
        <button
          onClick={() => history.goBack()}
          className={`link-button ${styles.backButton}`}
        >
          Back
        </button>
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
            {sessionUser.superUser ? (
              <>
                <EditTutorial />
                <DeleteTutorial
                  linkText={
                    <i className={`${styles.deleteIcon} fas fa-trash`}></i>
                  }
                />
              </>
            ) : null}
          </div>
          <div className={styles.tutorialInfo}>
            <h1 className={styles.title}>{tutorial?.title}</h1>
            <p className={styles.description}>{tutorial?.description}</p>
          </div>
        </div>
        <Comments tutorial={tutorial} />
      </div>
    ) : (
      <h1 className={styles.pageLoad}>Sorry, this tutorial doesn't exist.</h1>
    )
  ) : (
    <div className={styles.pageLoad}>
      {/* Animated by Siyuan Qiu */}
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default IndividualTutorialPage;
