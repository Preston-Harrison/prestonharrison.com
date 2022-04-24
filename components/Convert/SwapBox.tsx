import { ethers, Signer } from 'ethers';
import React from 'react';
import { toast } from 'react-toastify';
import styles from '../../styles/Convert/SwapBox.module.scss';
import { displayRatio, fetchQuote, getAllowanceTx, Quote, TOKENS } from '../../utils/convert';
import ConfirmConvert from './ConfirmConvert';
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

    const [showConfirmModal, setShowConfirmModal] = React.useState(false);

    const onSwitch = () => {
        setCurrentFrom(currentTo);
        setCurrentTo(currentFrom);
        setFillingInput(undefined);
        setValueFrom('');
        setValueTo('');
    }

    const fetchBuyQuote = React.useCallback(() => {
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
    }, [valueFrom, currentFrom, currentTo, fillingInput, address])

    React.useEffect(() => {
        fetchBuyQuote();
    }, [fetchBuyQuote]);

    const fetchSellQuote = React.useCallback(() => {
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
    }, [valueTo, currentFrom, currentTo, fillingInput, address])

    React.useEffect(() => {
        fetchSellQuote();
    }, [fetchSellQuote]);

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

    const handleConvert = async () => {
        if (!response?.convert.tx || !signer) return console.error("No transaction or no signer");
        await toast.promise(signer.sendTransaction(response.convert.tx), {
            pending: "Convert Pending...",
            error: "Convert Failed",
            success: "Convert Successful"
        });
        return;
    }

    const allowanceError = !!response?.convert.error?.includes("ERC20: transfer amount exceeds allowance");

    const tryConvert = async () => {
        if (!signer) return console.error("No Signer");
        if (!response?.quote) return console.error("No Quote");
        if (allowanceError) {
            const allowanceTx = await getAllowanceTx(currentFrom, signer, response.quote.allowanceTarget);
            await toast.promise(signer.sendTransaction(allowanceTx), {
                pending: "Transaction Pending...",
                error: "Failed To Set Allowance",
                success: "Allowance Set Successfully"
            });

        } else {
            setShowConfirmModal(true);
        }
    }

    let alertConvert = false; // alert convert disables convert by default
    let disableConvert = false;
    let errorMessage: string | null = null;

    if (valueFrom === '' && valueTo === '') {
        disableConvert = true;
        errorMessage = "Please enter an amount"
    } else if (allowanceError) {
        errorMessage = `Allow ${currentFrom} to be converted`
    } else if (response?.convert.error) {
        alertConvert = true;
        errorMessage = response?.convert.error;
    }

    const details: string[][] = [];

    // Price display
    if (response) {
        const { sellTokenToEthRate, buyTokenToEthRate } = response.quote;
        details.push(["Price",
            `1 ${currentFrom} \u21d2 ${displayRatio(sellTokenToEthRate, buyTokenToEthRate)} ${currentTo}`
        ])
    } else {
        details.push(["Price", ""])
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["from-token"]}>
                <SelectToken current={currentFrom} onChange={setCurrentFrom} omit={currentTo} />
                <input
                    type="text"
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
                    value={fillingInput === "to" && loading ? LOADING_TEXT : valueTo}
                    onChange={onChangeTo}
                    disabled={fillingInput === "to" && loading}
                />
            </div>
            <div className={styles["details"]}>
                {details.map(detail => (
                    <div key={detail[0]}>
                        <div>{detail[0]}</div>
                        <div>{detail[1]}</div>
                    </div>
                ))}
            </div>
            <div className={styles['convert-button-container']}>
                {signer ?
                    <button
                        onClick={tryConvert}
                        className={`${styles['convert-button']} ${alertConvert ? "alert" : ""}`}
                        disabled={alertConvert || loading || disableConvert}
                    >
                        {loading ? "LOADING..." : errorMessage ?? "Convert"}
                    </button> : <WalletConnectButton address={undefined} setSigner={setSigner} />}
            </div>
            <ConfirmConvert
                show={showConfirmModal}
                fromAmount={valueFrom}
                toAmount={valueTo}
                onConvert={handleConvert}
                onClose={() => setShowConfirmModal(false)}
                fromSymbol={currentFrom}
                toSymbol={currentTo}
            />
        </div>
    )
}

export default SwapBox