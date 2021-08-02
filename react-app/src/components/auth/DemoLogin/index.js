import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import styles from "../LoginSignUpForm.module.css";


export const DemoLogin = () => {
  const dispatch = useDispatch();

  const demoLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <button onClick={demoLogin} className={`${styles.demoLogin} link-button`}>
        <span className={styles.switchLinks}>Demo Member</span>
    </button>
  )
}


export const SuperDemoLogin = () => {
  const dispatch = useDispatch();

  const superDemoLogin = () => {
    dispatch(login('superdemo@aa.io', 'password'))
  }

  return (
    <button onClick={superDemoLogin} className={`${styles.demoLogin} link-button`}>
        <span className={styles.switchLinks}>Demo Content Creator</span>
    </button>
  )
}
