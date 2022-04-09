import React from 'react';
import styles from '../styles/Modal.module.scss';

export type ModalType = "contact" | "menu" | null;

type Props = {
    type: ModalType;
    closeModal: () => void;
}

const Modal = ({ type, closeModal }: Props) => {
  const modalClassName = `blur-container ${styles["modal-container"]} 
    ${!!type ? "fade-in" : "fade-out"}`;
  return (
    <div className={modalClassName}>
        <div className={styles["close-button"]} onClick={closeModal}>
            close
        </div>
        {type}
    </div>
  )
}

export default Modal