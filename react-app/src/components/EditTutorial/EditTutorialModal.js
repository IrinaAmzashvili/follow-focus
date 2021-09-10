import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStateRef from 'react-usestateref';
import { editTutorial } from "../../store/tutorials";
import TutorialForm from "../TutorialForm";
import styles from "./EditTutorial.module.css";

const EditTutorial = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const tutorial = useSelector((state) => state.tutorials.current);

  const [errors, setErrors, errorsRef] = useStateRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState(tutorial?.title);
  const [description, setDescription] = useState(tutorial?.description);
  const [videoLink, setVideoLink] = useState(tutorial?.videoLink);
  const [style_id, setStyleId] = useState(tutorial.styleId);
  const [level_id, setLevelId] = useState(tutorial.levelId);
  const [tier_id, setTierId] = useState(tutorial.tierId);
  const [videoId, setVideoId] = useState('');

  const thumbnail_url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const values = {
    errors: errorsRef.current,
    title,
    description,
    videoLink,
    thumbnail_url,
    style_id,
    level_id,
    tier_id,
  };
  const setters = {
    setTitle,
    setDescription,
    setVideoLink,
    setStyleId,
    setLevelId,
    setTierId,
  };

  useEffect(() => {
    if (tutorial) setIsLoaded(true);
  }, [tutorial]);

  // create thumbnail url
  useEffect(() => {
    let extractedId;
    if (videoLink) {
      if (videoLink.includes("watch?v=")) extractedId = videoLink.slice(32)
      if (videoLink.includes("embed/")) extractedId = videoLink.slice(30)
      setVideoId(extractedId)
    }
  }, [videoLink])

  const errorHandling = async () => {
    const newErrors = [];

    const protocolDomain = "https://www.youtube.com/";
    const linkWatch = "watch?v=";
    const linkEmbed = "embed/";

    if (!videoLink) {
      newErrors.push('Video: required');
    } else if (
      !videoLink.startsWith(protocolDomain + linkWatch) &&
      !videoLink.startsWith(protocolDomain + linkEmbed)
    ) {
      newErrors.push("Video: not a valid url");
    }

    if (!title.length) {
      newErrors.push('Title: required');
    } else if (title.length < 3) {
      newErrors.push("Title: too short (min 3 characters)");
    } else if (title.length > 200) {
      newErrors.push("Title: too long (max 200 characters)");
    }

    if (description.length > 6000) newErrors.push("Description: too long (max 6000 characters)");

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    errorHandling();

    if (errorsRef.current.length) return;
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
