import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTiers } from "../../store/tiers";
import { getDanceStyles } from "../../store/danceStyles";
import { getTutorialLevels } from "../../store/tutorialLevels";
import styles from "./TutorialForm.module.css";

const TutorialForm = ({ handleSubmit, values, setters, title }) => {
  const dispatch = useDispatch();
  const danceStyles = useSelector((state) => Object.values(state.danceStyles));
  const levels = useSelector((state) => Object.values(state.tutorialLevels));
  const tiers = useSelector((state) => Object.values(state.tiers));

  useEffect(() => {
    dispatch(getTiers());
    dispatch(getDanceStyles());
    dispatch(getTutorialLevels());
  }, [dispatch]);

  const displayError = (string) => {
    return values.errors.find((error) => error.includes(string));
  };

  return (
    <div className={styles.tutorialModal}>
      <div>
        <h1 className={styles.header}>{title}</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsDiv}>
          <div>
            <div>
              <div>
                <label htmlFor="title">Title</label>
                <div className={styles.errorDiv}>{displayError("Title")}</div>
              </div>
              <div>
                <input
                  id="title"
                  className={styles.input}
                  name="title"
                  type="text"
                  placeholder="Tutorial title"
                  value={values.title}
                  onChange={(e) => setters.setTitle(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="description">Description</label>
                <div className={styles.errorDiv}>
                  {displayError("Description")}
                </div>
              </div>
              <div>
                <textarea
                  id="description"
                  className={styles.textAreaInput}
                  name="description"
                  placeholder="Tutorial description..."
                  value={values.description}
                  onChange={(e) => setters.setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="videoLink">Video link</label>
                <div className={styles.errorDiv}>{displayError("Video")}</div>
              </div>
              <div>
                <input
                  id="videoLink"
                  className={styles.input}
                  name="videoLink"
                  placeholder="Video link"
                  value={values.videoLink}
                  onChange={(e) => setters.setVideoLink(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="thumbnailUrl">Thumbnail url</label>
                <div className={styles.errorDiv}>
                  {displayError("Thumbnail")}
                </div>
              </div>
              <div>
                <input
                  id="thumbnailUrl"
                  className={styles.input}
                  name="thumbnailUrl"
                  placeholder="Thumbnail image"
                  value={values.thumbnail_url}
                  onChange={(e) => setters.setThumbnailUrl(e.target.value)}
                ></input>
              </div>
            </div>
            <div className={styles.previewImgDiv}>
              <img className={styles.previewImg} src={values.thumbnail_url} alt='thumbnail preview' />
            </div>
          </div>

          <div>
            <div>
              <div>
                <label htmlFor="styleId">Dance style</label>
                <div className={styles.errorDiv}>{displayError("Style")}</div>
              </div>
              <div>
                <select
                  id="styleId"
                  name="styleId"
                  className={styles.input}
                  onChange={(e) => setters.setStyleId(e.target.value)}
                >
                  {danceStyles &&
                    danceStyles.map((style, i) => (
                      <option value={style.id} key={i}>
                        {style.danceStyle}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="levelId">Tutorial level</label>
                <div className={styles.errorDiv}>{displayError("Level")}</div>
              </div>
              <div>
                <select
                  id="levelId"
                  name="levelId"
                  className={styles.input}
                  onChange={(e) => setters.setLevelId(e.target.value)}
                >
                  {levels &&
                    levels.map((level, i) => (
                      <option value={level.id} key={i}>
                        {level.levelType}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="tierId">
                  Tier (will be available to all tiers higher than the chose
                  one)
                </label>
                <div className={styles.errorDiv}>{displayError("Tier")}</div>
              </div>
              <div>
                <select
                  id="tierId"
                  name="tierId"
                  className={styles.input}
                  onChange={(e) => setters.setTierId(e.target.value)}
                >
                  {tiers &&
                    tiers.map((tier, i) => (
                      <option value={tier.id} key={i}>
                        {tier.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className={`cta-button ${styles.saveButton}`} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorialForm;
