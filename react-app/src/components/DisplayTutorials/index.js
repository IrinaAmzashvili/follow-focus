// import { FiHeart } from "react-icons/fi";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/loading-dots-in-yellow.json";
import styles from "./DisplayTutorials.module.css";

const DisplayTutorials = ({
  tutorialsToDisplay,
  isLoaded,
  handlePrevious,
  handleNext,
  allTutorials,
  start,
  handleBeginning,
  page,
  numOfTutorials
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

  // trim title length
  const trimTitle = (title) => {
    if (title.length > 50) return `${title.slice(0, 49)}...`;
    return title;
  };

  return (
    <>
      {isLoaded ? (
        tutorialsToDisplay.length === 0 ? (
          <p>none available</p>
        ) : (
          <div className={styles.tutorialsContainer}>
            {tutorialsToDisplay &&
              tutorialsToDisplay.map((tutorial) => (
                <div className={styles.videoCard} key={tutorial.id}>
                  <a href={`/tutorials/${tutorial.id}`}>
                    <div className={styles.cardTop}>
                      <img
                        className={styles.thumbnailImg}
                        src={tutorial.thumbnailUrl}
                        alt="video thumbnail"
                      />
                    </div>
                    <div className={styles.cardBottom}>
                      <p className={styles.videoTitle}>
                        {trimTitle(tutorial.title)}
                      </p>
                      {/* <div className={styles.likeButton}>
                        <FiHeart />
                      </div> */}
                    </div>
                  </a>
                </div>
              ))}
          </div>
        )
      ) : (
        <div>
          {/* Animated by Siyuan Qiu */}
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      )}

      <div className={styles.prevNextButtonDiv}>
        {start > 0 ? (
          <button className={`link-button`} onClick={handleBeginning}>
            <HiOutlineChevronDoubleLeft />
          </button>
        ) : null}
        {/* if start is greater than 0, display previous button */}
        {start ? (
          <button className={`link-button`} onClick={handlePrevious}>
            {page - 1}
          </button>
        ) : null}
        {/* if on first page of multiple, display 1... or page number without ellipsis */}
        {numOfTutorials > 16 ? (
          page === 1 ? (
            <span className={styles.pageNum}>
              {page}
              {"..."}
            </span>
          ) : (
            <span className={styles.pageNum}>{page}</span>
          )
        ) : null}
        {/* if not at end of tutorials, display next button as arrow or next number */}
        { start < numOfTutorials - 16 ? (
          page <= 1 ? (
            <button className={`link-button`} onClick={handleNext}>
              <HiOutlineChevronRight />
            </button>
          ) : (
            <button className={`link-button`} onClick={handleNext}>
              {page + 1}
              {"..."}
            </button>
          )
        ) : null}
      </div>
    </>
  );
};

export default DisplayTutorials;
