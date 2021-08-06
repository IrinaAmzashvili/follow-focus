import styles from "./FilterTutorials.module.css";

const FilterTutorials = ({
  allStylesChecked,
  handleAllStylesChecked,
  danceStyles,
  handleCheckedStyles,
  allLevelsChecked,
  handleAllLevelsChecked,
  tutorialLevels,
  handleCheckedLevels,
}) => {

  return (
    <div className={styles.filterContainer}>
      <div className={styles.allFiltersDiv}>
        <ul className={styles.filterUl}>
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

        <ul className={`${styles.levelsUl} ${styles.filterUl}`}>
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
