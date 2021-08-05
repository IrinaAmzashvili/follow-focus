import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTutorialLevels } from "../../store/tutorialLevels";
import { getDanceStyles } from "../../store/danceStyles";
import styles from "./FilterTutorials.module.css";

const FilterTutorials = ({ allTutorials, isLoaded }) => {
  const dispatch = useDispatch();

  /************************* Filter by dance style *************************/
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
    console.log('checkedStyles', arr, checkedStyles)
  };

  if (isLoaded) {
    if (checkedStyles.length) {
      allTutorials = allTutorials.filter((tutorial) =>
      checkedStyles.includes(tutorial.styleId.toString())
      );
    }
  }

  /************************* Filter by tutorial levels *************************/
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
  };

  if (isLoaded) {
    if (checkedLevels.length) {
      allTutorials = allTutorials.filter((tutorial) =>
      checkedLevels.includes(tutorial.levelId.toString())
      );
    }
  }
  console.log('allTutorials--->', allTutorials)

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filtersDiv}>
        <div>
          <p>Dance Styles:</p>
          {danceStyles &&
            danceStyles.map((style, i) => (
              <div key={i}>
                <label htmlFor={style.danceStyle}>{style.danceStyle}</label>
                <input
                  id={style.danceStyle}
                  type="checkbox"
                  value={style.id}
                  onChange={handleCheckedStyles}
                />
              </div>
            ))}
        </div>

        <div>
          <p>Levels:</p>
          {tutorialLevels &&
            tutorialLevels.map((level, i) => (
              <div key={i}>
                <label htmlFor={level.levelType}>{level.levelType}</label>
                <input
                  id={level.levelType}
                  type="checkbox"
                  value={level.id}
                  onChange={handleCheckedLevels}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTutorials;
