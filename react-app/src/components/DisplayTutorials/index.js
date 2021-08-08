// import { FiHeart } from "react-icons/fi";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronLeft,
  // HiOutlineChevronDoubleRight,
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

  // const [pages, setPages] = useState(1);

  // if (isLoaded) {
  //   const numOfPages = Math.ceil((allTutorials.length + 1)/ 16)
  //   const allPages = [];
  //   for (let i = 0; i < numOfPages; i++) {
  //     allPages.push(i + 1)
  //   }
  //   setPages(allPages)
  // }

  // trim title length
  const trimTitle = (title) => {
    if (title.length > 50) return `${title.slice(0, 49)}...`;
    return title;
  };

  return (
    <>
      {isLoaded ? (
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
              <HiOutlineChevronLeft />
            </button>
        ) : null}
        {allTutorials?.length > 16 ? (
          <span className={styles.pageNum}>{page}</span>
        ) : null}
        {/* if not at end of tutorials, display next button */}
        {start < allTutorials?.length - 16 ? (
          <button className={`link-button`} onClick={handleNext}>
            <HiOutlineChevronRight />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default DisplayTutorials;
