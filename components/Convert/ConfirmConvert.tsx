import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../styles/Convert/ConfirmConvert.module.scss';

type Props = {
    fromAmount: string;
    toAmount: string;
    fromSymbol: string;
    toSymbol: string;
    onConvert: () => Promise<void>;
    show: boolean;
    onClose: () => void;
}

const ConfirmConvert = ({
    fromAmount,
    toAmount,
    fromSymbol,
    toSymbol,
    onConvert,
    show,
    onClose
}: Props) => {
    const [pending, setPending] = React.useState(false);

    const onConvertInternal = async () => {
        setPending(true);
        try {
            await onConvert();
        } finally {
            setPending(false);
            onClose();
        }
    }
    return (
        <div className={(show ? 'fade-in-fast' : 'fade-out-fast') + " blur-container"} id={styles['modal']}>
            <div className={styles['container']}>
                <div onClick={onClose} className={styles['top-bar']}>
                    <div>Confirm Convert</div>
                    <div><FontAwesomeIcon icon={faTimes} /></div>
                </div>
                <div className={styles['row']}>
                    <div>You Pay</div>
                    <div>{(+fromAmount).toFixed(4)} {fromSymbol}</div>
                </div>
                <div className={styles['row']}>
                    <div>You Receive</div>
                    <div>{(+toAmount).toFixed(4)} {toSymbol}</div>
                </div>
                <button onClick={onConvertInternal} disabled={pending}>
                    {pending ? 'Pending...' : 'Convert'}
                </button>
            </div>
        </div>
    )
}

export default ConfirmConvert