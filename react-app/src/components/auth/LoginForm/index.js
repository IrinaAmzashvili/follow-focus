import { useState } from 'react';
import LoginForm from './LoginForm';
import { Modal } from '../../../context/Modal';
import styles from '../LoginSignUpForm.module.css';


const LoginFormModal = ({ linkText }) => {
  const [showModal1, setShowModal1] = useState();

  return (
    <>
      <button className={`${styles.loginButton} link-button`} onClick={() => setShowModal1(true)}>
        {linkText}
      </button>
      {showModal1 && (
        <Modal onClose={() => setShowModal1(false)}>
          <LoginForm setShowModal={setShowModal1} />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
