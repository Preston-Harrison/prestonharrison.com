import React from 'react';
import styles from '../styles/Projects.module.scss';
import { PROJECTS } from '../utils/projects';

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

const ProjectsMobile = ({ showTop, showMiddle, showBottom }: Props) => {
    const top = showTop ? "fade-in-delay" : "fade-out";
    const middle = showMiddle ? "fade-in-delay" : "fade-out";
    const bottom = showBottom ? "fade-in-delay" : "fade-out";
  
    const expandTop = showTop ? styles["expand-out"] : styles["retract-in"];
    const expandMiddle = showMiddle ? styles["expand-out"] : styles["retract-in"];
    const expandBottom = showBottom ? styles["expand-out"] : styles["retract-in"];

    return (
        <div className={styles["project-container-mobile"]}>
            <div className={top}>
                <div>
                    <h1>{PROJECTS[0].name}</h1>
                <hr className={expandTop}/>
                <p>
                    {PROJECTS[0].description}
                </p>
                </div>
                <div className={styles["code-demo-button-container"]}>
                    <button>Code</button>
                    <button>Demo</button>
                </div>
            </div>
            <div className={middle}>
                <div>
                    <h1>{PROJECTS[1].name}</h1>
                <hr className={expandMiddle}/>
                <p>
                    {PROJECTS[1].description}
                </p>
                </div>
                <div className={styles["code-demo-button-container"]}>
                    <button>Code</button>
                    <button>Demo</button>
                </div>
            </div>
            <div className={bottom}>
                <div>
                    <h1>{PROJECTS[2].name}</h1>
                <hr className={expandBottom}/>
                <p>
                    {PROJECTS[2].description}
                </p>
                </div>
                <div className={styles["code-demo-button-container"]}>
                    <button>Code</button>
                    <button>Demo</button>
                </div>
            </div>
        </div>
    )
}

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
                <h1>{PROJECTS[0].name}</h1>
                <div className={styles['icons']}>
                    <CodeIcon />
                    <DemoIcon />
                </div>
            </div>
            <hr className={expandTop}/>
            <p className={top}>
                {PROJECTS[0].description}
            </p>
        </div>
        <div className={styles["float-right"]}>
            <div className={middle}>
                <div className={styles['icons']}>
                    <CodeIcon />
                    <DemoIcon />
                </div>
                <h1>{PROJECTS[1].name}</h1>
            </div>
            <hr className={expandMiddle}/>
            <p className={middle}>
                {PROJECTS[1].description}
            </p>
        </div>
        <div>
            <div className={bottom}>
                <h1>{PROJECTS[2].name}</h1>
                <div className={styles['icons']}>
                    <CodeIcon />
                    <DemoIcon />
                </div>
            </div>
            <hr className={expandBottom}/>
            <p className={bottom}>
                {PROJECTS[2].description}
            </p>
        </div>
    </div>
  )
}

export {
    Projects,
    ProjectsMobile
};