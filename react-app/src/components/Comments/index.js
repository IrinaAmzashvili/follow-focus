import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import {
  setComments,
  deleteComment,
  unloadComments,
} from "../../store/comments";
import SaveCancelButtons from "./SaveCancelButtons";
import PostComment from "../PostComment";
import styles from "./Comments.module.css";

const Comments = ({ tutorial }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const tutComments = useSelector((state) => Object.values(state.comments));

  const [commentsLoaded, setCommentsLoaded] = useState();
  const [editClicked, setEditClicked] = useState(0);
  const [editBody, setEditBody] = useState("");
  const [commentToEdit, setCommentToEdit] = useState({});

  const allComments = tutComments.sort((comment1, comment2) => {
    if (new Date(comment1.createdAt) > new Date(comment2.createdAt)) return -1;
    if (new Date(comment1.createdAt) < new Date(comment2.createdAt)) return 1;
    return 0;
  });

  useEffect(() => {
    dispatch(setComments(tutorial.comments));
    return () => dispatch(unloadComments());
  }, [dispatch, tutorial.comments]);

  useEffect(() => {
    (async () => {
      if (allComments) {
        setCommentsLoaded(true);
      }
    })();
  }, [allComments]);

  const handleEdit = (e) => {
    e.preventDefault();
    const comment = allComments.find(
      (comment) => comment.id === +e.currentTarget.id
    );
    setEditBody(comment.body);
    setCommentToEdit(comment);
    setEditClicked(+e.currentTarget.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(e.currentTarget.id));
  };

  // check if comment was created today
  const isToday = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
      return true;
  };

  const trimDate = (date) => {
    const commDate = new Date(date);
    if (isToday(commDate)) return "Today";
    const yy = commDate.getFullYear();
    const mm = commDate.getMonth() + 1;
    const dd = commDate.getDate();
    return mm + '/' + dd + '/' + yy
  };

  if (!commentsLoaded) {
    return null;
  }

  return (
    <div className={styles.commentsSectionDiv}>
      <PostComment sessionUser={sessionUser} tutorial={tutorial} />

      {/* Display all comments */}
      <div className={styles.commentsSection}>
        {allComments &&
          allComments.map((comment, i) => (
            <div className={styles.userCommentDiv} key={i} id={comment.id}>
              <p className={styles.username}>{comment.user?.username}</p>
              <p className={styles.date}>{trimDate(comment.createdAt)}</p>
              {/* If user clicks edit button, make render textarea and record changes */}
              {editClicked === comment.id ? (
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className={`${styles.editCommentTextarea}`}
                ></textarea>
              ) : (
                <p className={styles.userComment}>{comment.body}</p>
              )}

              <div className={styles.commentButtonsDiv} id={comment.id}>
                <div className={styles.saveCancelButtonsDiv}>
                  {/* If user is commenter & comment is being edited, display save/ cancel buttons*/}
                  {sessionUser.id === comment.user?.id &&
                  editClicked === comment.id ? (
                    <SaveCancelButtons
                      comment={comment}
                      editBody={editBody}
                      setEditClicked={setEditClicked}
                      setCommentToEdit={setCommentToEdit}
                      commentToEdit={commentToEdit}
                    />
                  ) : null}
                </div>

                <div className={styles.editDeleteButtonsDiv}>
                  {/* If user is commenter & comment is not being edited, display the edit button */}
                  {sessionUser?.id === comment?.user?.id &&
                  editClicked !== comment?.id ? (
                    <button
                      className={`${styles.editCommentButton} icon-button link-button`}
                      id={comment?.id}
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
