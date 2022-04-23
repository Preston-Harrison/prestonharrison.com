import React from 'react'
import styles from '../../styles/Index/Title.module.scss';

type Props = {
    show: boolean;
}

const TitleCard = ({ show }: Props) => {

    return (
        <div className={styles["title-container"]} style={{ zIndex: show ? 2 : undefined }}>
            <h1 className={!show ? styles["moveToTop"] : ""}>Preston Harrison</h1>
            <h2 className={show ? "fade-in" : "fade-out"}>
                Full Stack Web / Blockchain Developer
            </h2>
        </div>
    )
}

export default TitleCard