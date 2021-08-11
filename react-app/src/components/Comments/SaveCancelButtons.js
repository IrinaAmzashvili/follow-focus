import { useDispatch } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { editComment } from "../../store/comments";
import styles from "./Comments.module.css";

const SaveCancelButtons = ({
  comment,
  editBody,
  setEditClicked,
  commentToEdit,
  setCommentToEdit,
  setError
}) => {
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    e.preventDefault();
    setError('');
    setEditClicked(0);
    setCommentToEdit({});
  };

  const handleSaveComment = async (e) => {
    e.preventDefault();

    if (editBody.length > 4000) {
      setError('Comment must be a maximum of 4000 characters');
      return;
    };
    setError('');
    const editedComment = {
      id: e.currentTarget.id,
      body: editBody,
      user_id: comment.user.id,
      tutorial_id: comment.tutorialId,
      created_at: commentToEdit.createdAt,
    };
    await dispatch(editComment(editedComment));
    setEditClicked(0);
  };

  return (
    <>
      {editBody && (
        <button
          className={`${styles.saveButton} icon-button link-button`}
          id={comment.id}
          onClick={handleSaveComment}
        >
          <RiSendPlane2Fill />
        </button>
      )}
      <button
        className={`${styles.cancelButton} link-button`}
        onClick={handleCancel}
      >
        Cancel
      </button>
    </>
  );
};

export default SaveCancelButtons;
