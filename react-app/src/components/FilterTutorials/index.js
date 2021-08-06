import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTutorialLevels } from "../../store/tutorialLevels";
import { getDanceStyles } from "../../store/danceStyles";
import styles from "./FilterTutorials.module.css";

const FilterTutorials = ({ allTutorials, isLoaded }) => {
  const dispatch = useDispatch();

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
    console.log('checkedStyles', arr, checkedStyles)
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
  }, [checkedStyles])

  /************************* Filter by tutorial levels *************************/
  const [allLevelsChecked, setAllLevelsChecked] = useState(true);
  const [checkedLevels, setCheckedLevels] = useState([]);
  const tutorialLevels = useSelector((state) => Object.values(state.tutorialLevels));

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
  console.log('allTutorials--->', allTutorials)

  const handleAllLevelsChecked = () => {
    setCheckedLevels([]);
    setAllLevelsChecked(true);
  }

  useEffect(() => {
    if (!checkedLevels.length) setAllLevelsChecked(true);
  }, [checkedLevels]);

  return (
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
  );
};

export default FilterTutorials;
