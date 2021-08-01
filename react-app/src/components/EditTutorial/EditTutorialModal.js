import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTutorial } from '../../store/tutorials';
import TutorialForm from '../TutorialForm';

const EditTutorial = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const tutorial = useSelector(state => state.tutorials.current);

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

  const values = { errors, title, description, videoLink, thumbnail_url };
  const setters = { setErrors, setTitle, setDescription, setVideoLink, setThumbnailUrl };

  useEffect(() => {
    if (tutorial) setIsLoaded(true)
  }, [tutorial])

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const video_link = videoLink.replace('watch?v=', 'embed/');

    const now = new Date();

    const editedTutorial = {
      id: tutorial.id,
      title,
      description,
      video_link,
      thumbnail_url,
      date: now,
      style_id: 1,
      level_id: 1,
      tier_id: 1,
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
    return null
  }

  return (
    <TutorialForm handleSubmit={handleSubmit} values={values} setters={setters} />
// {/*
//         <div>
//           <div>
//             <label htmlFor="date"></label>
//           </div>
//           <div>
//             <input
//               id="date"
//               name="date"
//               placeholder="mm/dd/yyyy"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             ></input>
//           </div>
//         </div>
// */}
//         {/* <div>
//           <div>
//             <label htmlFor="styleId"></label>
//           </div>
//           <div>
//             <select
//               id="styleId"
//               name="styleId"
//               value={}
//               onChange={(e) => setVideoLink(e.target.value)}
//             >
//               <option value=''></option>
//             </select>
//           </div>
//         </div> */}

//         {/* <div>
//           <div>
//             <label htmlFor="videoLink"></label>
//           </div>
//           <div>
//             <input
//               id="videoLink"
//               name="videoLink"
//               placeholder="Video Link"
//               value={video_link}
//               onChange={(e) => setVideoLink(e.target.value)}
//             ></input>
//           </div>
//         </div> */}

//         {/* <div>
//           <div>
//             <label htmlFor="videoLink"></label>
//           </div>
//           <div>
//             <input
//               id="videoLink"
//               name="videoLink"
//               placeholder="Video Link"
//               value={video_link}
//               onChange={(e) => setVideoLink(e.target.value)}
//             ></input>
//           </div>
//         </div> */}

    //     <div>
    //       <button className={`cta-button ${styles.saveButton}`} type='submit'>Save</button>
    //     </div>

    //   </form>
    // </div>
  );
};

export default EditTutorial;
