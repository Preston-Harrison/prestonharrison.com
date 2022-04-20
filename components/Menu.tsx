import React from 'react';
import styles from '../styles/Menu.module.scss';

const placeToScroll = {
    who: 2001,
    projects: 4001,
    contact: 9001,
}

const Menu = ({ closeModal }: { closeModal: () => void }) => {
  const handleClick = (place: "who" | "projects" | "contact") => () => {
    closeModal();
    window.scrollTo({
      top: placeToScroll[place],
      behavior: "smooth",
    });
  }
  return (
    <div className={styles['menu-container']}>
        <h1 onClick={handleClick("who")}>Who am I</h1>
        <div className={styles['separator']} />
        <h1 onClick={handleClick("projects")}>Projects</h1>
        <div className={styles['separator']} />
        <h1 onClick={handleClick("contact")}>Contact</h1>
    </div>
  )
}

export default Menu