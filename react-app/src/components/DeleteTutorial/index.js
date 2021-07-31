import { useState } from 'react';
import DeleteTutorial from './DeleteTutorial';
import { Modal } from '../../context/Modal';
import styles from './DeleteTutorial.module.css';


const DeleteTutorialModal = ({ linkText }) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.loginButton} link-button`} onClick={() => setShowModal(true)}>
        {linkText}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteTutorial setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default DeleteTutorialModal;
