import { VscGithub } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import styles from './Footer.module.css';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.developerDiv}>
        <p className={styles.devName}>Irina Amzashvili</p>
        <div className={styles.developerLinks}>
          <a href='https://github.com/IrinaAmzashvili' target='_blank'>
            <VscGithub />
          </a>
          <a href='https://www.linkedin.com/in/irina-amzashvili-683136211/' target='_blank'>
            <SiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
