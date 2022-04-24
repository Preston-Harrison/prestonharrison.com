import React from 'react';
import styles from '../../styles/Convert/SelectToken.module.scss';
import { TOKENS } from '../../utils/convert';

type Props = {
    omit?: string;
    current: string;
    onChange: (value: string) => void;
}

const SelectToken = ({ current, onChange, omit }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const checkIfClickedOutside = (e: any) => { // any because e.target not recognized in typescript
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside, true)

        return () => {
            document.removeEventListener("click", checkIfClickedOutside, true)
        }
    }, [isOpen])

    const handleMenuClick = (tokenSymbol: string) => {
        onChange(tokenSymbol);
        setIsOpen(false);
    }

    return (
        <div ref={ref} className={styles["container"]}>
            <button className={styles['active']} onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <img src={TOKENS[current].image} alt={current} />
                    <div>{current}</div>
                </div>
                <div>{isOpen ? "\u2303" : "\u2304"}</div>
            </button>
            <div className={`${styles[isOpen ? 'list-open' : 'list-closed']} ${styles['list']}`}>
                {Object.values(TOKENS).filter(token => token.symbol !== omit && token.symbol !== current)
                    .map(token => (
                        <button onClick={() => handleMenuClick(token.symbol)} key={token.symbol}>
                            <img src={token.image} alt={token.symbol} />
                            <div>
                                {token.symbol}
                            </div>
                        </button>
                    ))}
            </div>
        </div>
    )
}

export default SelectToken