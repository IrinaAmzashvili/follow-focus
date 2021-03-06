import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import { DemoLogin, SuperDemoLogin } from "../DemoLogin";
import LoginFormModal from "../LoginForm";
import styles from "../LoginSignUpForm.module.css";

const SignUpForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const displayError = (string) => {
    return errors.find((error) => error.includes(string));
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const newUser = {
        first_name,
        last_name,
        username,
        email,
        password,
        email_updates: true,
        tier_id: 1,
      };
      const data = await dispatch(signUp(newUser));
      if (data) {
        setErrors(data);
      } else {
        props.setSignupModal();
      }
    } else {
      setErrors(["Passwords must match."]);
    }
  };

  const handleClick = () => {
    props.setLoginModal();
    props.setSignupModal();
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.formContainer}>
      <button
        className={`link-button icon-button ${styles.exitButton}`}
        onClick={() => props.setSignupModal()}
      >
        <i className="far fa-times-circle"></i>
      </button>
      <form className={styles.form} onSubmit={onSignUp}>
        <h1 className={styles.header}>Sign Up</h1>

        <div className={styles.signupNameDivContainer}>
          <div className={styles.signupNameDiv}>
            <div className={`${styles.labelDivs} ${styles.nameDivs}`}>
              <label htmlFor="first_name">{displayError("First")}</label>
            </div>
            <input
              autoFocus
              id="first_name"
              className={styles.input}
              placeholder="First Name"
              type="text"
              name="username"
              onChange={(e) => setFirstName(e.target.value)}
              value={first_name}
            ></input>
          </div>

          <div className={styles.signupNameDiv}>
            <div className={`${styles.labelDivs} ${styles.nameDivs}`}>
              <label htmlFor="last_name">{displayError("Last")}</label>
            </div>
            <input
              id="last_name"
              className={styles.input}
              placeholder="Last Name"
              type="text"
              name="username"
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
            ></input>
          </div>
        </div>

        <div>
          <div className={styles.labelDivs}>
            <label htmlFor="username">{displayError("Username")}</label>
          </div>
          <input
            id="username"
            className={styles.input}
            placeholder="Username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>

        <div>
          <div className={styles.labelDivs}>
            <label htmlFor="email">{displayError("Email")}</label>
          </div>
          <input
            id="email"
            className={styles.input}
            placeholder="Email"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>

        <div>
          <div className={styles.labelDivs}>
            <label htmlFor="password">{displayError("Password")}</label>
          </div>
          <input
            id="password"
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>

        <div>
          <div className={styles.labelDivs}>
            <label htmlFor="repeatPassword">{displayError("Password")}</label>
          </div>
          <input
            id="repeatPassword"
            className={styles.input}
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
          ></input>
        </div>
        <div>
          <button className={`cta-button ${styles.submitButton}`} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className={styles.switchLinkDiv}>
        Already a member?{" "}
        <span onClick={handleClick} className={styles.switchLinks}>
          <LoginFormModal linkText={"Log in here!"} />
        </span>
      </div>
      <div className={styles.demoLoginDiv}>
        <p>To experience site without an account, log in as a</p>
        <DemoLogin setModal={props.setSignupModal} /> or a{" "}
        <SuperDemoLogin setModal={props.setSignupModal} />
      </div>
    </div>
  );
};

export default SignUpForm;
