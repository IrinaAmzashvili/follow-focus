import { createContext, useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [setValue]);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}></div>
    </>
  )
}

export const Modal = ({ children, onClose }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalBackground} onClick={onClose}></div>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>,
    modalNode
  );
}
