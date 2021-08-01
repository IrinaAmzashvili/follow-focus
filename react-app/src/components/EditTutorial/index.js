import { useState } from 'react';
import EditTutorialModal from './EditTutorialModal';
import { Modal } from '../../context/Modal';
import styles from './EditTutorial.module.css';


const EditTutorial = () => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.editIconButton} link-button`} onClick={() => setShowModal(true)}>
        {<i className="fas fa-edit"></i>}
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
