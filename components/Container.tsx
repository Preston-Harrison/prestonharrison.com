import React from 'react';
import styles from '../styles/Container.module.scss';

type Props = {
    children: React.ReactNode;
    size: "small" | "medium" | "large";
    className?: string;
}

const Container = (props: Props) => {
  return (
    <div 
      id={styles["container-all"]}
      className={`${styles[`container-${props.size}`]} ${props.className ?? ""}`}>
        {props.children}
    </div>
  )
}

export default Container