import { Redirect } from 'react-router-dom';
// import styles from './SplashPage.module.css';


const SplashPage = ({ sessionUser }) => {
  if (sessionUser) {
    return (
      <Redirect to='/tutorials'/>
    )
  }
  return (
    <h1>You're seeing this if you're not logged in.</h1>
  )
}

export default SplashPage;
