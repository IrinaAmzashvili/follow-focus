import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FiHeart } from "react-icons/fi";
import { getTutorials, unloadTutorials } from "../../store/tutorials";
import CreateTutorial from "../CreateTutorial";
import FilterTutorials from "../FilterTutorials";
import DisplayTutorials from "../DisplayTutorials";
import { getTutorialLevels } from "../../store/tutorialLevels";
import { getDanceStyles } from "../../store/danceStyles";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
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

  // fetch tutorials
  useEffect(() => {
    (async () => {
      await dispatch(getTutorials());
      setIsLoaded(true);
    })();
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
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [allStylesChecked, setAllStylesChecked] = useState(true);
  const [checkedStyles, setCheckedStyles] = useState([]);
  const danceStyles = useSelector((state) => Object.values(state.danceStyles));

  useEffect(() => {
    (async () => {
      await dispatch(getDanceStyles());
      setStylesLoaded(true);
    })();
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
  const [levelsLoaded, setLevelsLoaded] = useState(false);
  const [allLevelsChecked, setAllLevelsChecked] = useState(true);
  const [checkedLevels, setCheckedLevels] = useState([]);
  const tutorialLevels = useSelector((state) =>
    Object.values(state.tutorialLevels)
  );

  useEffect(() => {
    (async () => {
      await dispatch(getTutorialLevels());
      setLevelsLoaded(true);
    })();
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
      {stylesLoaded && levelsLoaded ? (

        <FilterTutorials
        allStylesChecked={allStylesChecked}
        handleAllStylesChecked={handleAllStylesChecked}
        danceStyles={danceStyles}
        handleCheckedStyles={handleCheckedStyles}
        allLevelsChecked={allLevelsChecked}
        handleAllLevelsChecked={handleAllLevelsChecked}
        tutorialLevels={tutorialLevels}
        handleCheckedLevels={handleCheckedLevels}
      />
      ) : null}

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

        <DisplayTutorials
          tutorialsToDisplay={tutorialsToDisplay}
          isLoaded={isLoaded}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          start={start}
          allTutorials={allTutorials}
        />

      </div>
    </div>
  );
};

export default TutorialsPage;
