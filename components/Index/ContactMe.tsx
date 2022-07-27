import React from 'react';
import styles from '../../styles/Index/ContactMe.module.scss';

type Props = {
    show: boolean;
    openContact: () => void;
}

const TYPEWRITER_WORDS = [" website?", " app?", " smart contract?"];

const ContactMe = ({ show, openContact }: Props) => {
    const [typewriter, setTypewriter] = React.useState('');

    React.useEffect(() => {
        setTypewriter('');
        let typeInterval: NodeJS.Timeout;
        let deleteInterval: NodeJS.Timeout;
        let wordIndex = 0;
        const typeWord = (word: string) => {
            let i = 0;
            typeInterval = setInterval(() => {
                if (i <= word.length) {
                    setTypewriter(word.slice(0, i));
                } else {
                    i = word.length + 35; // 35 * interval length wait at the end of word
                    deleteInterval = setInterval(() => {
                        if (i >= 0) {
                            setTypewriter(word.slice(0, i));
                        } else {
                            clearInterval(deleteInterval);
                            wordIndex++;
                            typeInterval = typeWord(TYPEWRITER_WORDS[wordIndex % TYPEWRITER_WORDS.length]);
                        }
                        i--;
                    }, 100);
                    clearInterval(typeInterval);
                }
                i++;
            }, 300);
            return typeInterval;
        }
        typeWord(TYPEWRITER_WORDS[wordIndex]);
        return () => {
            clearInterval(typeInterval);
            clearInterval(deleteInterval);
        };
    }, [show])

    return (
        <div className={`${styles["contact-me-container"]} ${show ? "fade-in" : "fade-out"}`}
            style={{ zIndex: show ? 2 : undefined }}>
            <h1>Ready to build your{typewriter}<div className={styles["cursor"]}>{" "}</div></h1>
            <button onClick={openContact}>Contact me</button>
        </div>
    )
}

export default ContactMe