import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStateRef from 'react-usestateref';
import { createTutorial } from "../../store/tutorials";
import TutorialForm from "../TutorialForm";
import styles from "./CreateTutorial.module.css";

const CreateTutorialModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors, errorsRef] = useStateRef([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [style_id, setStyleId] = useState(1);
  const [level_id, setLevelId] = useState(1);
  const [tier_id, setTierId] = useState(1);
  const [videoId, setVideoId] = useState('');

  const thumbnail_url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const values = {
    errors: errorsRef.current,
    title,
    description,
    videoLink,
    style_id,
    level_id,
    tier_id,
    thumbnail_url,
  };
  const setters = {
    setTitle,
    setDescription,
    setVideoLink,
    setStyleId,
    setLevelId,
    setTierId,
  };

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

    // if there are any errors, do not proceed
    if (errorsRef.current.length) return;
    const video_link = videoLink.replace("watch?v=", "embed/");

    const newTutorial = {
      title,
      description,
      video_link,
      thumbnail_url,
      date: new Date(),
      style_id,
      level_id,
      tier_id,
    };

    const data = await dispatch(createTutorial(newTutorial));
    if (data.errors) {
      setErrors(data.errors);
      return;
    } else {
      // if creation successful, redirect to tutorial page
      history.push(`/tutorials/${data.id}`);
    }
  };

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
        title={"Create Tutorial"}
      />
    </>
  );
};

export default CreateTutorialModal;
