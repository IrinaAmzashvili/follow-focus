import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import {
  setComments,
  postComment,
  deleteComment,
  editComment,
} from "../../store/comments";
// import EditComment from "../EditComment";
import styles from "./Comments.module.css";

const Comments = ({ tutorial }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const tutComments = useSelector((state) => Object.values(state.comments));

  const [commentBody, setCommentBody] = useState("");
  const [editClicked, setEditClicked] = useState(0);
  const [editBody, setEditBody] = useState('');

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

  const handleCancel = (e) => {
    e.preventDefault();
    setEditClicked(0);
  };

  const handleSaveComment = (e) => {
    e.preventDefault();
    // const editedComment = {
    //   id: e.currentTarget.id,
    //   body: editBody,
    //   user_id: sessionUser.id,
    //   tutorial_id: tutorial.id,
    //   // created_at: comment.createdAt
    // };

    console.log("--->", editBody);
    // dispatch(editComment(editedComment));
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
              <p
                contentEditable={editClicked === comment.id}
                // vaue={editClicked === comment.id ? editBody : comment.body}
                vaue={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className={`${styles.userComment}`}
              >
                {/* {editClicked === comment.id ? editBody : comment.body} */}
                {comment.body}
              </p>

              <div className={styles.commentButtonsDiv} id={comment.id}>
                {/* If user is commenter & comment is not being edited, display the edit button */}
                {sessionUser.id === comment.user.id &&
                editClicked !== comment.id ? (
                  <button
                    className={`${styles.editCommentButton} link-button`}
                    id={comment.id}
                    onClick={handleEdit}
                  >
                    <FiEdit />
                  </button>
                ) : null}

                {/* If user is commenter & comment is being edited, display save/ cancel buttons*/}
                {sessionUser.id === comment.user.id &&
                editClicked === comment.id ? (
                  <div className={styles.editCommentButtonsDiv}>
                    {/* <EditComment comment={comment} user_id={sessionUser.id} /> */}
                    <button
                      className={`link-button`}
                      id={comment.id}
                      onClick={handleSaveComment}
                    >
                      <RiSendPlane2Fill />
                    </button>
                    <button className={`link-button`} onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : null}

                {/* If user is commenter, display delete button */}
                {sessionUser.id === comment.user.id ? (
                  <button
                    className={`${styles.deleteCommentButton} link-button`}
                    id={comment.id}
                    onClick={handleDelete}
                  >
                    {<i className="fas fa-trash"></i>}
                  </button>
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
