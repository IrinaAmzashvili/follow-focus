import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import EditTutorialModal from './EditTutorialModal';
import { Modal } from '../../context/Modal';
import styles from './EditTutorial.module.css';


const EditTutorial = () => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.editIconButton} icon-button link-button`} onClick={() => setShowModal(true)}>
        <FiEdit />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditTutorialModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditTutorial;
