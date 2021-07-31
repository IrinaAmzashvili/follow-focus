import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTutorial } from '../../store/tutorials';
import styles from "./EditTutorial.module.css";

const EditTutorial = ({ tutorial }) => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(tutorial?.title);
  const [description, setDescription] = useState(tutorial?.description);
  const [videoLink, setVideoLink] = useState(tutorial?.videoLink);
  const [thumbnail_url, setThumbnailUrl] = useState(tutorial?.thumbnailUrl);
  // const [date, setDate] = useState(tutorial.date);
  // const [style_id, setStyleId] = useState(tutorial.styleId);
  // const [level_id, setLevelId] = useState(tutorial.levelId);
  // const [tier_id, setTierId] = useState(tutorial.tierId);
  // const [tags, setTags] = useState(tutorial.tags);

  useEffect(() => {
    if (tutorial) setIsLoaded(true)
  }, [tutorial])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const video_link = videoLink.replace('watch?v=', 'embed/')

    const editedTutorial = {
      id: tutorial.id,
      title,
      description,
      video_link,
      thumbnail_url,
      // date,
      // style_id,
      // level_id,
      // tier_id,
      // tags,
    };
    const data = await dispatch(editTutorial(editedTutorial));
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    // setShowModal(false);
  };

  if (!isLoaded) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Edit Tutorial</h1>
        </div>
        <ul className={styles.errorsUl}>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>

        <div>
          <div>
            <label htmlFor="title"></label>
          </div>
          <div>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Tutorial title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="description"></label>
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Tutorial description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="videoLink"></label>
          </div>
          <div>
            <input
              id="videoLink"
              name="videoLink"
              placeholder="Video link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            ></input>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="thumbnailUrl"></label>
          </div>
          <div>
            <input
              id="thumbnailUrl"
              name="thumbnailUrl"
              placeholder="Thumbnail image"
              value={thumbnail_url}
              onChange={(e) => setThumbnailUrl(e.target.value)}
            ></input>
          </div>
        </div>
{/*
        <div>
          <div>
            <label htmlFor="date"></label>
          </div>
          <div>
            <input
              id="date"
              name="date"
              placeholder="mm/dd/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="styleId"></label>
          </div>
          <div>
            <select
              id="styleId"
              name="styleId"
              value={video_link}
              onChange={(e) => setVideoLink(e.target.value)}
            >
              <option value=''></option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="videoLink"></label>
          </div>
          <div>
            <input
              id="videoLink"
              name="videoLink"
              placeholder="Video Link"
              value={video_link}
              onChange={(e) => setVideoLink(e.target.value)}
            ></input>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="videoLink"></label>
          </div>
          <div>
            <input
              id="videoLink"
              name="videoLink"
              placeholder="Video Link"
              value={video_link}
              onChange={(e) => setVideoLink(e.target.value)}
            ></input>
          </div>
        </div> */}

        <div>
          <button type='submit'>Save</button>
        </div>

      </form>
    </div>
  );
};

export default EditTutorial;
