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
  const sessionUser = useSelector((state) => state.session.user);

  // navigate to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /************************* Handling Tutorials *************************/
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [numOfTutorials, setNumOfTutorials] = useState(0);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);

  // grab all tutorials, sort by date
  let allTutorials = useSelector((state) =>
    Object.values(state.tutorials.all).sort((tutorial1, tutorial2) => {
      if (new Date(tutorial1.date) > new Date(tutorial2.date)) return -1;
      if (new Date(tutorial1.date) < new Date(tutorial2.date)) return 1;
      return 0;
    })
  );

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
    setPage(1);
  }, [search]);

  // show next 16 and previous 16 videos
  const handleBeginning = () => {
    setStart(0);
    setPage(1);
    window.scrollTo(0, 400);
  };
  const handleNext = () => {
    setStart((prev) => prev + 16);
    setPage(prev => prev + 1);
    window.scrollTo(0, 400);
  };
  const handlePrevious = () => {
    if (start < 16) {
      setStart(0);
    } else {
      setStart((prev) => prev - 16);
    }
    setPage(prev => prev - 1);
    window.scrollTo(0, 400);
  };

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
    setStart(0);
    setPage(1);
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

  const handleAllStylesChecked = () => {
    setCheckedStyles([]);
    setAllStylesChecked(true);
    setStart(0);
    setPage(1);
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
    setStart(0);
    setPage(1);
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

  const handleAllLevelsChecked = () => {
    setCheckedLevels([]);
    setAllLevelsChecked(true);
    setStart(0);
    setPage(1);
  };

  useEffect(() => {
    if (!checkedLevels.length) setAllLevelsChecked(true);
  }, [checkedLevels]);

  let data;
  // if (levelsLoaded && stylesLoaded) {
    data = {
      start_num: start,
      style_ids_list: checkedStyles,
      level_ids_list: checkedLevels,
    }
  // }
  console.log('====>1', data)

  // fetch tutorials
  useEffect(() => {
    // if (levelsLoaded && stylesLoaded) {

      (async () => {
        // const data = {
        //   start_num: start,
        //   style_ids_list: checkedStyles.length ? checkedStyles : danceStyles.map(style => style.id),
        //   level_ids_list: checkedLevels.length ? checkedLevels : tutorialLevels.map(level => level.id),
        // }
        console.log('====>2', data)
        const res = await dispatch(getTutorials(data));
        setNumOfTutorials(res);
        setIsLoaded(true);
      })();
    // }
    return () => dispatch(unloadTutorials());
  }, [dispatch, start, checkedStyles, checkedLevels]);
  // , danceStyles, tutorialLevels, checkedStyles, checkedLevels


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

      {/* search feature */}
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
          {sessionUser.superUser ? <CreateTutorial /> : null}
        </div>

        <DisplayTutorials
          isLoaded={isLoaded}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          start={start}
          allTutorials={allTutorials}
          handleBeginning={handleBeginning}
          page={page}
          numOfTutorials={numOfTutorials}
        />
      </div>
    </div>
  );
};

export default TutorialsPage;
