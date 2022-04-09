import React from 'react';
import Container from './Container';
import styles from '../styles/WhoAmI.module.scss';

type Props = {
    show: boolean;
}

const WhoAmI = ({ show }: Props) => {
  return (
    <div className={styles["who-am-i-container"]} style={{ zIndex: show ? 2 : undefined}}>
        <h1 className={show ? "fade-in" : "fade-out"}>Who am I?</h1>
        <hr className={show ? styles["animateIn"] : styles["animateOut"]}/>
        <p className={show ? "fade-in" : "fade-out"}>
            I am a full stack web developer with a passion for blockchain and
            cryptocurrency. I have a background in finance and a background in
            business. Blah blah blah random text etc etc
        </p>
    </div>
  )
}

export default WhoAmI