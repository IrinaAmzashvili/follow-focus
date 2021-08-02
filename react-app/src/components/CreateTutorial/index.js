import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import CreateTutorialModal from './CreateTutorialModal';
import { Modal } from '../../context/Modal';
import styles from './CreateTutorial.module.css';


const CreateTutorial = () => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.createNewTutorialButton} link-button`} onClick={() => setShowModal(true)}>
        <AiOutlineAppstoreAdd />
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
