import { useState } from 'react';
import CreateTutorialModal from './CreateTutorialModal';
import { Modal } from '../../context/Modal';
import styles from './CreateTutorial.module.css';


const CreateTutorial = () => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.createNewTutorialButton} cta-button`} onClick={() => setShowModal(true)}>
        Create New Tutorial
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateTutorialModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default CreateTutorial;
