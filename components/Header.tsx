import React from 'react';
import styles from '../styles/Header.module.scss';

type Props = {
  openMenu: () => void;
}

const Header = ({ openMenu }: Props) => {
  return (
    <div id={styles["header-container"]}>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="34" viewBox="0 0 28 28" aria-labelledby="title" fill="white" onClick={openMenu}>
            <title id="title">Menu Icon</title>
            <rect y="0" width="60" height="2"/>
            <rect y="13" width="60" height="2"/>
            <rect y="26" width="60" height="2"/>
      </svg>
        <button>
            <div>Resume</div>
            <div className={styles["icon"]}>&#11123;</div>
        </button>
    </div>
  )
}

export default Header