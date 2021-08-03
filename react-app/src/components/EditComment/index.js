import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiSendPlane2Fill } from "react-icons/ri";
import { editComment } from '../../store/comments';
import styles from './EditComment.module.css';


const EditComment = ({ comment, user_id }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(comment.body);

  const handleSaveComment = (e) => {
    e.preventDefault();
    const editedComment = {
      id: comment?.id,
      body,
      user_id,
      tutorial_id: comment.tutorialId,
      created_at: comment.createdAt
    };

    console.log("--->", editedComment);
    dispatch(editComment(editedComment));
  };


  return (
    <form>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      >
      </textarea>
      <button onClick={handleSaveComment} className={`${styles.saveCommentButton} link-button`}>
        <RiSendPlane2Fill />
      </button>
    </form>
  )
}

export default EditComment;
