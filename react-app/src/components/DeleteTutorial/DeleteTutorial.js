import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTutorial } from '../../store/tutorials';
// import styles from './DeleteTutorial.module.css';

const DeleteTutorial = ({ setShowModal }) => {
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
    <div>
      <h1>Are you sure you want to delete this tutorial?</h1>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </div>
  )
}

export default DeleteTutorial;
