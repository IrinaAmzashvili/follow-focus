import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTutorial } from '../../store/tutorials';
import styles from './DeleteTutorial.module.css';

const DeleteTutorialModal = ({ setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tutorial = useSelector(state => state.tutorials.current);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteTutorial(tutorial.id))
    // if successfully deleted, redirect
    if (res['success']) {
      history.push('/tutorials');
    }
  }

  return (
    <div className={styles.confirmDeleteDiv}>
      <button className={`link-button icon-button ${styles.exitButton}`} onClick={() => setShowModal(false)}>
      <i className="far fa-times-circle"></i>
      </button>
      <h1 className={styles.header}>Delete Tutorial?</h1>
      <p className={styles.text}>Are you sure you want to delete this tutorial? You cannot undo this action.</p>
      <div className={styles.buttonsDiv}>
        <button className={`cta-button cta-button-inverse ${styles.cancelButton}`} onClick={() => setShowModal(false)}>Cancel</button>
        <button className={`cta-button ${styles.deleteButton}`} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteTutorialModal;
