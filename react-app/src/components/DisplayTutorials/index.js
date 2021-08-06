// import { FiHeart } from "react-icons/fi";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/loading-dots-in-yellow.json";
import styles from "../TutorialsPage/TutorialsPage.module.css";

const DisplayTutorials = ({
  tutorialsToDisplay,
  isLoaded,
  handlePrevious,
  handleNext,
  allTutorials,
  start,
}) => {
  
  // loading animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isLoaded ? (
        <div className={styles.tutorialsContainer}>
          {tutorialsToDisplay &&
            tutorialsToDisplay.map((tutorial) => (
              <a href={`/tutorials/${tutorial.id}`} key={tutorial.id}>
                <div className={styles.videoCard}>
                  <div className={styles.cardTop}>
                    <img
                      className={styles.thumbnailImg}
                      src={tutorial.thumbnailUrl}
                      alt="video thumbnail"
                    />
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.videoTitle}>{tutorial.title}</div>
                    {/* <div className={styles.likeButton}>
                        <FiHeart />
                      </div> */}
                  </div>
                </div>
              </a>
            ))}
        </div>
      ) : (
        <div>
          {/* Animated by Siyuan Qiu */}
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      )}
      <div className={styles.prevNextButtonDiv}>
        {/* if start is greater than 0, display previous button */}
        {start ? (
          <button className={`link-button`} onClick={handlePrevious}>
            Previous
          </button>
        ) : null}
        {/* if not at end of tutorials, display next button */}
        {start < allTutorials?.length - 16 ? (
          <button className={`link-button`} onClick={handleNext}>
            Next
          </button>
        ) : null}
      </div>
    </>
  );
};

export default DisplayTutorials;
