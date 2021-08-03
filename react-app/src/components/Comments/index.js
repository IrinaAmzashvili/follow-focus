import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { setComments, postComment, deleteComment } from "../../store/comments";
import EditComment from "../EditComment";
import styles from "./Comments.module.css";

const Comments = ({ tutorial }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const tutComments = useSelector((state) => Object.values(state.comments));

  const [commentBody, setCommentBody] = useState('');
  const [editClicked, setEditClicked] = useState(0);

  const allComments = tutComments.sort((comment1, comment2) => {
    if (comment1.createdAt < comment2.createdAt) return -1;
    if (comment1.createdAt > comment2.createdAt) return 1;
    return 0;
  });

  useEffect(() => {
    dispatch(setComments(tutorial.comments));
  }, [dispatch, tutorial.comments]);

  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {
      body: commentBody,
      user_id: sessionUser.id,
      tutorial_id: tutorial.id,
      created_at: new Date(),
    };
    dispatch(postComment(newComment));
    setCommentBody("");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditClicked(+e.currentTarget.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(e.currentTarget.id));
  };


  return (
    // Create a comment
    <div className={styles.commentsSectionDiv}>
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
            <button className={`${styles.submitButton} link-button`}>
              <RiSendPlane2Fill />
            </button>
          ) : null}
        </form>
      </div>

      {/* Display all comments */}
      <div className={styles.commentsSection}>
        {allComments &&
          allComments.map((comment, i) => (
            <div className={styles.userCommentDiv} key={i} id={comment.id}>
              <p className={styles.username}>{comment.user.username}</p>
              <p className={styles.date}>{comment.createdAt}</p>
              <p className={styles.userComment}>{comment.body}</p>
              <div className={styles.commentButtonsDiv} id={comment.id}>
                {sessionUser.id === comment.user.id ? (
                  <button
                    className={`${styles.editCommentButton} link-button`}
                    id={comment.id}
                    onClick={handleEdit}
                  >
                    <FiEdit />
                  </button>
                ) : null}
                {sessionUser.id === comment.user.id ? (
                  <button
                    className={`${styles.deleteCommentButton} link-button`}
                    id={comment.id}
                    onClick={handleDelete}
                  >
                    {<i className="fas fa-trash"></i>}
                  </button>
                ) : null}
                {editClicked === comment.id ? (
                    <EditComment comment={comment} user_id={sessionUser.id} />
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
