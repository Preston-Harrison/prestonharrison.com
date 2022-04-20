import React from 'react';
import styles from '../styles/LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <div className={styles["loading-screen-container"]}>
        <div>Loading</div>
        <div className={styles['loader']}></div>
    </div>
  )
}

export default LoadingScreen