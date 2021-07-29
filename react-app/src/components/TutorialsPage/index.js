import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTutorials } from "../../store/tutorials";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const allTutorials = useSelector(state => Object.values(state.tutorials))

  useEffect(() => {
    dispatch(getTutorials())
  }, [dispatch]);

  return (
    <div className={styles.tutorialsPage}>
      <div className={styles.filterContainer}>Hello from filter</div>
      <div className={styles.tutorialsDiv}>
        <div className={styles.tutorialsSearch}>
          <label htmlFor='searchVideos'>
            <input
              id='searchVideos'
              className={styles.videoSearch}
              placeholder="Search Videos"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
          </label>
        </div>
        <div className={styles.tutorialsContainer}>
          {allTutorials && allTutorials.map((tutorial) => (
            <div className={styles.videoCard} key={tutorial.id}>
              <div className={styles.videoThumbnail}></div>
              <div className={styles.videoTitle}></div>
              <div className={styles.likeButton}>{tutorial.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
