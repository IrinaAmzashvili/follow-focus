import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import styles from "../LoginSignUpForm.module.css";


export const DemoLogin = ({ setModal }) => {
  const dispatch = useDispatch();

  const demoLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
    setModal()
  }

  return (
    <button onClick={demoLogin} className={`${styles.demoLogin} link-button`}>
        <span className={styles.switchLinks}>Demo Member</span>
    </button>
  )
}


export const SuperDemoLogin = ({ setModal }) => {
  const dispatch = useDispatch();

  const superDemoLogin = () => {
    dispatch(login('superdemo@aa.io', 'password'))
    setModal()
  }

  return (
    <button onClick={superDemoLogin} className={`${styles.demoLogin} link-button`}>
        <span className={styles.switchLinks}>Demo Content Creator</span>
    </button>
  )
}
