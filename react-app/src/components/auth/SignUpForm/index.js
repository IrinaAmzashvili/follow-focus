import SignUpForm from "./SignUpForm";
import { Modal } from "../../../context/Modal";
import styles from "../LoginSignUpForm.module.css";

const LoginFormModal = (props) => {

  return (
    <>
      <button
        className={`${styles.signUpButton} link-button`}
        onClick={props.setSignupModal}
      >
        {props.linkText}
      </button>
      {props.showSignupModal && (
        <Modal onClose={() => props.setSignupModal()}>
          <SignUpForm
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
