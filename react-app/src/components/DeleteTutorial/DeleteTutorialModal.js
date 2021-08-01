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
      <h1 className={styles.header}>Are you sure?</h1>
      <p className={styles.text}>Are you sure you want to delete this tutorial?</p>
      <div className={styles.buttonsDiv}>
        <button className={`cta-button button-danger ${styles.deleteButton}`} onClick={handleDelete}>Delete</button>
        <button className={`cta-button button-green ${styles.cancelButton}`} onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteTutorialModal;
