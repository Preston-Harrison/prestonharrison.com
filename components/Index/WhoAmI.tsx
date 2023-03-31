import React from 'react';
import styles from '../../styles/Index/WhoAmI.module.scss';

type Props = {
  show: boolean;
}

const WhoAmI = ({ show }: Props) => {
  return (
    <div className={styles["who-am-i-container"]} style={{ zIndex: show ? 2 : undefined }}>
      <h1 className={show ? "fade-in" : "fade-out"}>Who am I?</h1>
      <hr className={show ? styles["animateIn"] : styles["animateOut"]} />
      <p className={show ? "fade-in" : "fade-out"}>
        Hi, my name is Preston. I&apos;m a full stack / blockchain developer 
        with an interest in web technology and cryptocurrencies. I&apos;m
        currently located in Seattle, WA. I love learning,
        and am always on the lookout for new projects / skills to pick up.
      </p>
    </div>
  )
}

export default WhoAmI