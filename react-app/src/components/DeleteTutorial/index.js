import { useState } from 'react';
import DeleteTutorialModal from './DeleteTutorialModal';
import { Modal } from '../../context/Modal';
import styles from './DeleteTutorial.module.css';


const DeleteTutorial = () => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.deleteIconButton} icon-button link-button`} onClick={() => setShowModal(true)}>
        {<i className='fas fa-trash'></i>}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteTutorialModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default DeleteTutorial;
