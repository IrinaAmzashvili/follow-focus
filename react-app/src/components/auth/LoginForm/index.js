import { useState } from 'react';
import LoginForm from './LoginForm';
import { Modal } from '../../../context/Modal';
import styles from '../LoginSignUpForm.module.css';


const LoginFormModal = ({ linkText }) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className={`${styles.loginButton} link-button`} onClick={() => setShowModal(true)}>
        {linkText}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
