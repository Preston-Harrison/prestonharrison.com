import React from 'react';
import styles from '../styles/Projects.module.scss';

type Props = {
    showTop: boolean;
    showBottom: boolean;
    showMiddle: boolean;
}

const DemoIcon = ({ link = "#" }: { link?: string }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            Demo
        </a>
    )
};

const CodeIcon = ({ link = "#" }: { link?: string }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            Code
        </a>
    )
};

const Projects = ({ showTop, showMiddle, showBottom }: Props) => {

  const top = showTop ? "fade-in" : "fade-out";
  const middle = showMiddle ? "fade-in" : "fade-out";
  const bottom = showBottom ? "fade-in" : "fade-out";

  const expandTop = showTop ? styles["expand-out"] : styles["retract-in"];
  const expandMiddle = showMiddle ? styles["expand-out"] : styles["retract-in"];
  const expandBottom = showBottom ? styles["expand-out"] : styles["retract-in"];

  return (
    <div className={styles["project-container"]} style={{ zIndex: showTop ? 2 : undefined}}>
        <div>
            <div className={top}>
                <h1>Web3 invoice gateway</h1>
                <div>
                    <CodeIcon />
                    <DemoIcon />
                </div>
            </div>
            <hr className={expandTop}/>
            <p className={top}>
                This is a web application that allows users to create invoices and pay them.
                The application is built using React, Next.js, TypeScript, and Solidity.
            </p>
        </div>
        <div className={styles["float-right"]}>
            <div className={middle}>
                <div>
                    <CodeIcon />
                    <DemoIcon />
                </div>
                <h1>Web3 invoice gateway</h1>
            </div>
            <hr className={expandMiddle}/>
            <p className={middle}>
                This is a web application that allows users to create invoices and pay them.
                The application is built using React, Next.js, TypeScript, and Solidity.
            </p>
        </div>
        <div>
            <div className={bottom}>
                <h1>Web3 invoice gateway</h1>
                <div>
                    <CodeIcon />
                    <DemoIcon />
                </div>
            </div>
            <hr className={expandBottom}/>
            <p className={bottom}>
                This is a web application that allows users to create invoices and pay them.
                The application is built using React, Next.js, TypeScript, and Solidity.
            </p>
        </div>
    </div>
  )
}

export default Projects;