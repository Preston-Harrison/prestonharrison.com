import { ethers, Signer } from 'ethers';
import React from 'react';
import styles from '../../styles/Convert/SwapBox.module.scss';
import { fetchQuote, Quote, TOKENS } from '../../utils/convert';
import SelectToken from './SelectToken';
import WalletConnectButton from './WalletConnectButton';

type Props = {
    address: string | undefined;
    signer: Signer | undefined;
    setSigner: (signer: Signer | undefined) => void;
}

const DEBOUNCE = 500;
const LOADING_TEXT = "loading..."

let fetchFromQuoteId: NodeJS.Timeout;
let fetchToQuoteId: NodeJS.Timeout;

const canBeNumber = (value: string) => !isNaN(+value);

const SwapBox = ({ address, signer, setSigner }: Props) => {
    const [currentFrom, setCurrentFrom] = React.useState<string>('DAI');
    const [currentTo, setCurrentTo] = React.useState<string>('MATIC');

    const [valueFrom, setValueFrom] = React.useState('');
    const [valueTo, setValueTo] = React.useState('');

    const [fillingInput, setFillingInput] = React.useState<"to" | "from">();
    const [loading, setLoading] = React.useState(false);

    const [response, setResponse] = React.useState<{
        quote: Quote;
        convert: {
            tx: ethers.PopulatedTransaction | null;
            error: string | null;
        }
    }>();

    const onSwitch = () => {
        setCurrentFrom(currentTo);
        setCurrentTo(currentFrom);
        setFillingInput(undefined);
        setValueFrom('');
        setValueTo('');
    }

    React.useEffect(() => {
        if (fillingInput === "from") return;
        if (+valueFrom === 0 || !canBeNumber(valueFrom)) return setValueTo('');
        if (fetchFromQuoteId) {
            clearTimeout(fetchFromQuoteId);
        }
        fetchFromQuoteId = setTimeout(async () => {
            setLoading(true);
            setResponse(undefined);
            const response = await fetchQuote({
                fromSymbol: currentFrom,
                toSymbol: currentTo,
                sellAmount: valueFrom,
                takerAddress: address,
            });
            setLoading(false);
            setResponse(response);
            setValueTo(ethers.utils.formatUnits(response.quote.buyAmount, TOKENS[currentTo].decimals));
        }, DEBOUNCE);

    }, [valueFrom, currentFrom, currentTo, fillingInput, address]);

    React.useEffect(() => {
        if (fillingInput === "to") return;
        if (+valueTo === 0 || !canBeNumber(valueTo)) return setValueFrom('');
        if (fetchToQuoteId) {
            clearTimeout(fetchToQuoteId);
        }
        fetchToQuoteId = setTimeout(async () => {
            setLoading(true);
            setResponse(undefined);
            const response = await fetchQuote({
                fromSymbol: currentFrom,
                toSymbol: currentTo,
                buyAmount: valueTo,
                takerAddress: address,
            });
            setLoading(false);
            setResponse(response);
            setValueFrom(ethers.utils.formatUnits(response.quote.sellAmount, TOKENS[currentFrom].decimals));
        }, DEBOUNCE);

    }, [valueTo, currentFrom, currentTo, fillingInput, address]);

    const onChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValueFrom(value);
        setFillingInput("to");
    }

    const onChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValueTo(value);
        setFillingInput("from");
    }

    const handleConvert = () => {
    }

    let alertConvert = false; // alert convert disables convert by default
    let disableConvert = false;
    let errorMessage: string | null = null;

    if (valueFrom === '' && valueTo === '') {
        disableConvert = true;
        errorMessage = "Please enter an amount"
    } else if (response?.convert.error) {
        alertConvert = true;
        errorMessage = response?.convert.error;
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["from-token"]}>
                <SelectToken current={currentFrom} onChange={setCurrentFrom} omit={currentTo} />
                <input
                    type="text"
                    placeholder="from token amount"
                    value={fillingInput === "from" && loading ? LOADING_TEXT : valueFrom}
                    onChange={onChangeFrom}
                    disabled={fillingInput === "from" && loading}
                />
            </div>
            <button className={styles['switch-tokens']} onClick={onSwitch} disabled={loading}>
                Switch
            </button>
            <div className={styles["to-token"]}>
                <SelectToken current={currentTo} onChange={setCurrentTo} omit={currentFrom} />
                <input
                    type="text"
                    placeholder="to token amount"
                    value={fillingInput === "to" && loading ? LOADING_TEXT : valueTo}
                    onChange={onChangeTo}
                    disabled={fillingInput === "to" && loading}
                />
            </div>
            <div className={styles['convert-button-container']}>
                {signer ?
                    <button
                        onClick={handleConvert}
                        className={`${styles['convert-button']} ${alertConvert ? "alert" : ""}`}
                        disabled={alertConvert || loading || disableConvert}
                    >
                        {loading ? "LOADING..." : errorMessage ?? "Convert"}
                    </button> : <WalletConnectButton address={undefined} setSigner={setSigner} />}
            </div>
        </div>
    )
}

export default SwapBox