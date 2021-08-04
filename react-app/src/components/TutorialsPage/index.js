import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { getTutorials, unloadTutorials } from "../../store/tutorials";
import CreateTutorial from "../CreateTutorial";
import styles from "./TutorialsPage.module.css";

const TutorialsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(0);

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

  const handleNext = () => {
    setStart((prev) => prev + 16);
  };

  const handlePrevious = () => {
    setStart((prev) => prev - 16);
  };

  let tutorialsToDisplay = allTutorials.slice(start, start + 16);

  return (
    <div className={styles.tutorialsPage}>
      <div className={styles.filterContainer}>Filter Div</div>
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

        <div className={styles.tutorialsContainer}>
          {allTutorials &&
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
        <div className={styles.prevNextButtonDiv}>
          {start ? (
              <button className={`link-button`} onClick={handlePrevious}>Previous</button>
            ) : null}
          {start < allTutorials.length - 16 ? (
            <button className={`link-button`} onClick={handleNext}>Next</button>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
