import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import Lottie from 'react-lottie';
import loadingAnimation from '../../lotties/loading-dots-in-yellow.json';
import { getTutorials, unloadTutorials } from "../../store/tutorials";
import { getDanceStyles } from '../../store/danceStyles';
import CreateTutorial from "../CreateTutorial";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState("");
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(0);

  // grab all tutorials, sort by date
  let allTutorials = useSelector((state) => Object.values(state.tutorials.all).sort((tutorial1, tutorial2) => {
    if (new Date(tutorial1.date) > new Date(tutorial2.date)) return -1;
    if (new Date(tutorial1.date) < new Date(tutorial2.date)) return 1;
    return 0
  }));

  // get all dance styles
  const [checkedStyles, setCheckedStyles] = useState([]);
  const danceStyles = useSelector((state) => Object.values(state.danceStyles));

  useEffect(() => {
    dispatch(getDanceStyles());
  }, [dispatch]);

  const handleCheckedStyles = (e) => {
    const arr = [...checkedStyles];
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      const index = arr.indexOf(e.target.value)
      arr.splice(index, 1)
    }
    setCheckedStyles(arr);
  }

  // loading animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // fetch tutorials
  useEffect(() => {
    const fetchTutorials = async () => {
      await dispatch(getTutorials());
      setIsLoaded(true);
    };
    fetchTutorials();
    return () => dispatch(unloadTutorials());
  }, [dispatch]);


  const searchFeature = () => {
    return allTutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(search.toLowerCase())
    );
  };
  allTutorials = searchFeature();

  // when searching, reset page to show first videos
  useEffect(() => {
    setStart(0)
  }, [search])

  // display only 16 videos at a time
  const tutorialsToDisplay = allTutorials.slice(start, start + 16)

  // show next 16 and previous 16 videos
  const handleNext = () => {
    setStart((prev) => prev + 16);
  };
  const handlePrevious = () => {
    setStart((prev) => prev - 16);
  };


  return (
    <div className={styles.tutorialsPage}>
      <div className={styles.filterContainer}>
        <div className={styles.filtersDiv}>
          <p>Dance Styles:</p>
            {danceStyles && danceStyles.map((style, i) => (
              <div key={i}>
                <label htmlFor={style.danceStyle}>{style.danceStyle}</label>
                <input id={style.danceStyle} type='checkbox' value={style.id} onChange={handleCheckedStyles}/>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.tutorialsDiv}>
        <div className={styles.tutorialsTopDiv}>
          <div className={styles.tutorialsSearch}>
            <label htmlFor="searchVideos">
              <input
                id="searchVideos"
                className={styles.videoSearch}
                placeholder="Search Videos"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <CreateTutorial />
        </div>

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
                    <div className={styles.likeButton}>
                      <FiHeart />
                    </div>
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
              <button className={`link-button`} onClick={handlePrevious}>Previous</button>
            ) : null}
          {/* if not at end of tutorials, display next button */}
          {start < allTutorials.length - 16 ? (
            <button className={`link-button`} onClick={handleNext}>Next</button>
            ) : null}
        </div>
      </div>
    </div>
  )
};

export default TutorialsPage;
