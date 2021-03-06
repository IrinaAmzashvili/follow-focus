import { useState } from "react";
import { useDispatch } from 'react-redux';
import { RiSendPlane2Fill } from "react-icons/ri";
import { postComment } from '../../store/comments';
import styles from "./PostComment.module.css";


const PostComment = ({ sessionUser, tutorial }) => {
  const dispatch = useDispatch();

  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState('');

  const handlePost = (e) => {
    e.preventDefault();

    if (commentBody.length > 4000) {
      setError('Comment must be a maximum of 4000 characters');
      return;
    };
    setError('');
    const newComment = {
      body: commentBody,
      user_id: sessionUser.id,
      tutorial_id: tutorial.id,
      created_at: new Date(),
    };
    dispatch(postComment(newComment));
    setCommentBody("");
  };


  return (
    <div className={styles.commentTextareaDiv}>
    <form className={styles.form} onSubmit={handlePost}>
      <label htmlFor="commentInput">
        <textarea
          id="commentInput"
          name="commentInput"
          placeholder="Do you have any questions or comments?..."
          className={styles.commentTextarea}
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
      </label>
      {commentBody ? (
        <button
        className={`${styles.submitButton} icon-button link-button`}
        >
          <RiSendPlane2Fill />
        </button>
      ) : null}
    </form>
    <div className={styles.errorDiv}>
      <span className={styles.error}>{error}</span>
    </div>
  </div>
  )
}

export default PostComment;
