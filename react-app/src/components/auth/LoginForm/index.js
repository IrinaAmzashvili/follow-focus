import LoginForm from "./LoginForm";
import { Modal } from "../../../context/Modal";
import styles from "../LoginSignUpForm.module.css";

const LoginFormModal = (props) => {

  return (
    <>
      <button
        className={`${styles.loginButton} link-button`}
        onClick={props.setLoginModal}
      >
        {props.linkText}
      </button>
      {props.showLoginModal && (
        <Modal onClose={() => props.setLoginModal()}>
          <LoginForm
            showLoginModal={props.showLoginModal}
            setLoginModal={props.setLoginModal}
            showSignupModal={props.showSignupModal}
            setSignupModal={props.setSignupModal}
          />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
