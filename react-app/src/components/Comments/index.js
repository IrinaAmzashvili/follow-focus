import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import {
  setComments,
  deleteComment,
  editComment,
} from "../../store/comments";
import PostComment from '../PostComment';
import styles from "./Comments.module.css";

const Comments = ({ tutorial }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const tutComments = useSelector((state) => Object.values(state.comments));

  const [editClicked, setEditClicked] = useState(0);
  const [editBody, setEditBody] = useState("");
  const [commentToEdit, setCommentToEdit] = useState({});

  const allComments = tutComments.sort((comment1, comment2) => {
    if (comment1.createdAt < comment2.createdAt) return -1;
    if (comment1.createdAt > comment2.createdAt) return 1;
    return 0;
  });

  useEffect(() => {
    dispatch(setComments(tutorial.comments));
  }, [dispatch, tutorial.comments]);

  const handleEdit = (e) => {
    e.preventDefault();
    const comment = allComments.find(
      (comment) => comment.id === +e.currentTarget.id
    );
    setEditBody(comment.body);
    setCommentToEdit(comment);
    setEditClicked(+e.currentTarget.id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditClicked(0);
    setCommentToEdit({});
  };

  const handleSaveComment = async (e) => {
    e.preventDefault();
    const editedComment = {
      id: e.currentTarget.id,
      body: editBody,
      user_id: sessionUser.id,
      tutorial_id: tutorial.id,
      created_at: commentToEdit.createdAt,
    };
    await dispatch(editComment(editedComment));
    setEditClicked(0);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(e.currentTarget.id));
  };

  return (
    <div className={styles.commentsSectionDiv}>
      <PostComment sessionUser={sessionUser} tutorial={tutorial} />

      {/* Display all comments */}
      <div className={styles.commentsSection}>
        {allComments &&
          allComments.map((comment, i) => (
            <div className={styles.userCommentDiv} key={i} id={comment.id}>
              <p className={styles.username}>{comment.user.username}</p>
              <p className={styles.date}>{comment.createdAt}</p>
              {/* If user clicks edit button, make text editable and record changes */}
              {editClicked === comment.id ? (
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className={`${styles.editCommentTextarea}`}
                ></textarea>
              ) : (
                <p className={styles.userComment}>
                  {comment.body}
                </p>
              )}

              <div className={styles.commentButtonsDiv} id={comment.id}>
                <div className={styles.saveCancelButtonsDiv}>
                  {/* If user is commenter & comment is being edited, display save/ cancel buttons*/}
                  {sessionUser.id === comment.user.id &&
                  editClicked === comment.id ? (
                    <>
                      <button
                        className={`${styles.saveButton} icon-button link-button`}
                        id={comment.id}
                        onClick={handleSaveComment}
                      >
                        <RiSendPlane2Fill />
                      </button>
                      <button
                        className={`${styles.cancelButton} link-button`}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                </div>

                <div className={styles.editDeleteButtonsDiv}>
                  {/* If user is commenter & comment is not being edited, display the edit button */}
                  {sessionUser.id === comment.user.id &&
                  editClicked !== comment.id ? (
                    <button
                      className={`${styles.editCommentButton} icon-button link-button`}
                      id={comment.id}
                      onClick={handleEdit}
                    >
                      <FiEdit />
                    </button>
                  ) : null}

                  {/* If user is commenter, display delete button */}
                  {sessionUser.id === comment.user.id ? (
                    <button
                      className={`${styles.deleteCommentButton} icon-button link-button`}
                      id={comment.id}
                      onClick={handleDelete}
                    >
                      {<i className="fas fa-trash"></i>}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
