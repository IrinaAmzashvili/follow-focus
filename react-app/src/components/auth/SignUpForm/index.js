import { useState } from 'react';
import SignUpForm from './SignUpForm';
import { Modal } from '../../../context/Modal';
import styles from '../LoginSignUpForm.module.css';


const LoginFormModal = ({ linkText }) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.signUpButton} link-button`} onClick={() => setShowModal(true)}>
        {linkText}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
