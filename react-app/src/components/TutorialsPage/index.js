import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { getTutorials, unloadTutorials } from "../../store/tutorials";
import CreateTutorial from "../CreateTutorial";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  let allTutorials = useSelector((state) => Object.values(state.tutorials.all));

  useEffect(() => {
    dispatch(getTutorials());
    return () => dispatch(unloadTutorials());
  }, [dispatch]);

  const searchFeature = () => {
    return allTutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  allTutorials = searchFeature();

  return (
    <div className={styles.tutorialsPage}>
      <div className={styles.filterContainer}>Filter Div</div>
      <div className={styles.tutorialsDiv}>
        <div className={styles.tutorialsTopDiv}>
          <CreateTutorial />
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
        </div>

        <div className={styles.tutorialsContainer}>
          {allTutorials &&
            allTutorials.map((tutorial) => (
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
      </div>
    </div>
  );
};

export default TutorialsPage;
