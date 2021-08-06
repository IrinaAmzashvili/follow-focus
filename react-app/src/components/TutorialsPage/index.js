import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FiHeart } from "react-icons/fi";
import Lottie from "react-lottie";
import loadingAnimation from "../../lotties/loading-dots-in-yellow.json";
import { getTutorials, unloadTutorials } from "../../store/tutorials";
import CreateTutorial from "../CreateTutorial";
import FilterTutorials from "../FilterTutorials";
import { getTutorialLevels } from "../../store/tutorialLevels";
import { getDanceStyles } from "../../store/danceStyles";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState("");
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(0);

  // grab all tutorials, sort by date
  let allTutorials = useSelector((state) =>
    Object.values(state.tutorials.all).sort((tutorial1, tutorial2) => {
      if (new Date(tutorial1.date) > new Date(tutorial2.date)) return -1;
      if (new Date(tutorial1.date) < new Date(tutorial2.date)) return 1;
      return 0;
    })
  );

  // loading animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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

  // search feature
  const searchFeature = () => {
    if (isLoaded) {
      return allTutorials.filter((tutorial) =>
        tutorial.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  };
  allTutorials = searchFeature();

  // when searching, reset page to show first videos
  useEffect(() => {
    setStart(0);
  }, [search]);

  // show next 16 and previous 16 videos
  const handleNext = () => {
    setStart((prev) => prev + 16);
  };
  const handlePrevious = () => {
    setStart((prev) => prev - 16);
  };

  /***************************************************************************************/

  /************************* Filter by dance style *************************/
  const [allStylesChecked, setAllStylesChecked] = useState(true);
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
      const index = arr.indexOf(e.target.value);
      arr.splice(index, 1);
    }
    setCheckedStyles(arr);
    setAllStylesChecked(false);
  };

  if (isLoaded) {
    if (checkedStyles.length) {
      allTutorials = allTutorials.filter((tutorial) =>
        checkedStyles.includes(tutorial.styleId.toString())
      );
    }
  }

  const handleAllStylesChecked = () => {
    setCheckedStyles([]);
    setAllStylesChecked(true);
  };

  useEffect(() => {
    if (!checkedStyles.length) setAllStylesChecked(true);
  }, [checkedStyles]);

  /************************* Filter by tutorial levels *************************/
  const [allLevelsChecked, setAllLevelsChecked] = useState(true);
  const [checkedLevels, setCheckedLevels] = useState([]);
  const tutorialLevels = useSelector((state) =>
    Object.values(state.tutorialLevels)
  );

  useEffect(() => {
    dispatch(getTutorialLevels());
  }, [dispatch]);

  const handleCheckedLevels = (e) => {
    const arr = [...checkedLevels];
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      const index = arr.indexOf(e.target.value);
      arr.splice(index, 1);
    }
    setCheckedLevels(arr);
    setAllLevelsChecked(false);
  };

  if (isLoaded) {
    if (checkedLevels.length) {
      allTutorials = allTutorials.filter((tutorial) =>
        checkedLevels.includes(tutorial.levelId.toString())
      );
    }
  }
  console.log("allTutorials--->", allTutorials);

  const handleAllLevelsChecked = () => {
    setCheckedLevels([]);
    setAllLevelsChecked(true);
  };

  useEffect(() => {
    if (!checkedLevels.length) setAllLevelsChecked(true);
  }, [checkedLevels]);



    // display only 16 videos at a time
  // const [tutorialsToDisplay, setTutorialsToDisplay] = useState();
  let tutorialsToDisplay;
  if (isLoaded) {
    tutorialsToDisplay = allTutorials.slice(start, start + 16);
    // setTutorialsToDisplay(allTutorials.slice(start, start + 16));
  }

  return (
    <div className={styles.tutorialsPage}>
      <div className={styles.filterContainer}>
        <div className={styles.allFiltersDiv}>
          <ul className={styles.filterDiv}>
            <p className={styles.filterTitles}>Dance Styles:</p>
            <li className={styles.checkboxAndLabel}>
              <label htmlFor="all-styles">All Styles</label>
              <input
                id="all-styles"
                type="checkbox"
                checked={allStylesChecked}
                onChange={handleAllStylesChecked}
              />
            </li>

            {danceStyles &&
              danceStyles.map((style, i) => (
                <li className={styles.checkboxAndLabel} key={i}>
                  <label htmlFor={style.danceStyle}>{style.danceStyle}</label>
                  <input
                    id={style.danceStyle}
                    type="checkbox"
                    checked={allStylesChecked ? false : null}
                    value={style.id}
                    onChange={handleCheckedStyles}
                  />
                </li>
              ))}
          </ul>

          <ul className={styles.filterDiv}>
            <p className={styles.filterTitles}>Levels:</p>
            <li className={styles.checkboxAndLabel}>
              <label htmlFor="all-levels">All Levels</label>
              <input
                id="all-levels"
                type="checkbox"
                checked={allLevelsChecked}
                onChange={handleAllLevelsChecked}
              />
            </li>

            {tutorialLevels &&
              tutorialLevels.map((level, i) => (
                <li className={styles.checkboxAndLabel} key={i}>
                  <label htmlFor={level.levelType}>{level.levelType}</label>
                  <input
                    id={level.levelType}
                    type="checkbox"
                    checked={allLevelsChecked ? false : null}
                    value={level.id}
                    onChange={handleCheckedLevels}
                  />
                </li>
              ))}
          </ul>
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
      </div>
    </div>
  );
};

export default TutorialsPage;
