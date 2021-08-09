import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTutorial } from "../../store/tutorials";
import TutorialForm from "../TutorialForm";
import styles from "./EditTutorial.module.css";

const EditTutorial = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const tutorial = useSelector((state) => state.tutorials.current);

  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(tutorial?.title);
  const [description, setDescription] = useState(tutorial?.description);
  const [videoLink, setVideoLink] = useState(tutorial?.videoLink);
  const [thumbnail_url, setThumbnailUrl] = useState(tutorial?.thumbnailUrl);
  const [style_id, setStyleId] = useState(tutorial.styleId);
  const [level_id, setLevelId] = useState(tutorial.levelId);
  const [tier_id, setTierId] = useState(tutorial.tierId);
  // const [tags, setTags] = useState(tutorial.tags);

  const values = {
    errors,
    title,
    description,
    videoLink,
    thumbnail_url,
    style_id,
    level_id,
    tier_id,
  };
  const setters = {
    setErrors,
    setTitle,
    setDescription,
    setVideoLink,
    setThumbnailUrl,
    setStyleId,
    setLevelId,
    setTierId,
  };

  useEffect(() => {
    if (tutorial) setIsLoaded(true);
  }, [tutorial]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const video_link = videoLink.replace("watch?v=", "embed/");

    const editedTutorial = {
      id: tutorial.id,
      title,
      description,
      video_link,
      thumbnail_url,
      date: new Date(),
      style_id,
      level_id,
      tier_id,
    };

    const data = await dispatch(editTutorial(editedTutorial));
    if (data.errors) {
      setErrors(data.errors);
      return;
    } else {
      setShowModal(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <button
        className={`link-button icon-button ${styles.exitButton}`}
        onClick={() => setShowModal(false)}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <TutorialForm
        handleSubmit={handleSubmit}
        values={values}
        setters={setters}
        title={"Edit Tutorial"}
      />
    </>
  );
};

export default EditTutorial;
