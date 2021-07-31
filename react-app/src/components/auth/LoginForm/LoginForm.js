import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import SignUpFormModal from '../SignUpForm';
import styles from "../LoginSignUpForm.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onLogin}>
        <h1 className={styles.header}>Log in</h1>
        <div className={styles.errorDiv}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div>
          <label htmlFor="email"></label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>

        <div>
          <button className={styles.submitButton} type="submit">Log In</button>
        </div>
      </form>
      <div>
        Not a member? <span className={styles.switchLink}><SignUpFormModal linkText={'Sign up here!'}/></span>
      </div>
    </div>
  );
};

export default LoginForm;
