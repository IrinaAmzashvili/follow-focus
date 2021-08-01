import styles from './TutorialForm.module.css'


const TutorialForm = ({ handleSubmit, values, setters }) => {
  const displayError = (string) => {
    return values.errors.find((error) => error.includes(string));
  };

  return (
    <div className={styles.tutorialModal}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <h1 className={styles.header}>Edit Tutorial</h1>
        </div>

        <div>
          <div>
            <label htmlFor="title">Title</label>
            <div className={styles.errorDiv}>{displayError('Title')}</div>
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
            <div className={styles.errorDiv}>{displayError('Description')}</div>
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
            <div className={styles.errorDiv}>{displayError('Video')}</div>
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
            <div className={styles.errorDiv}>{displayError('Thumbnail')}</div>
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

        <div>
          <button className={`cta-button ${styles.saveButton}`} type='submit'>Save</button>
        </div>

      </form>
    </div>
  )
}

export default TutorialForm;
