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
    const elErr = values.errors.find((error) => error.includes(string))

    if (!elErr) return null;
    if (elErr.includes('required')) return "required";

    const separator = elErr.indexOf(':');
    return elErr.slice(separator + 2)
  };

  return (
    <div className={styles.tutorialModal}>
      <div>
        <h1 className={styles.header}>{title}</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsDiv}>
          <div className={styles.formSectionLeft}>
            <div>
              <div className={styles.inputLabel}>
                <label htmlFor="title" className={styles.requiredField}>
                  Title
                </label>
                <span className={styles.errorSpan}>
                  {displayError("Title")}
                </span>
              </div>
              <div>
                <input
                  autoFocus
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
              <div className={styles.inputLabel}>
                <label htmlFor="videoLink" className={styles.requiredField}>
                  Youtube video url
                </label>
                <span className={styles.errorSpan}>
                  {displayError("Video")}
                </span>
              </div>
              <div>
                <input
                  id="videoLink"
                  className={styles.input}
                  name="videoLink"
                  placeholder="Youtube video url"
                  value={values.videoLink}
                  onChange={(e) => setters.setVideoLink(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={styles.previewImgDiv}>
              {values.thumbnail_url ? (
                <img
                  className={styles.previewImg}
                  src={values.thumbnail_url}
                  alt="thumbnail preview"
                />
              ) : null}
            </div>
          </div>

          <div className={styles.formSectionRight}>
            <div>
              <div className={styles.inputLabel}>
                <label htmlFor="description">Description</label>
                <span className={styles.errorSpan}>
                  {displayError("Description")}
                </span>
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
              <div className={styles.inputLabel}>
                <label htmlFor="styleId">Dance style</label>
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
              <div className={styles.inputLabel}>
                <label htmlFor="levelId">Tutorial level</label>
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
              <div className={styles.inputLabel}>
                <label htmlFor="tierId">
                  Tier
                  <span className={styles.tierMssg}>
                    (available to all tiers higher)
                  </span>
                </label>
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
