import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTutorial } from "../../store/tutorials";
import TutorialForm from "../TutorialForm";

const CreateTutorialModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [style_id, setStyleId] = useState(1);
  const [level_id, setLevelId] = useState(1);
  const [tier_id, setTierId] = useState(1);


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
    setTitle,
    setDescription,
    setVideoLink,
    setThumbnailUrl,
    setStyleId,
    setLevelId,
    setTierId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <TutorialForm
      handleSubmit={handleSubmit}
      values={values}
      setters={setters}
      title={'Create Tutorial'}
    />
  );
};

export default CreateTutorialModal;
