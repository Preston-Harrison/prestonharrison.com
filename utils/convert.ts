import { BigNumber, ethers } from "ethers";

type Token = {
    address: string;
    decimals: number;
    symbol: string;
    image: string;
    name: string;
}

const MATIC_DECIMALS = 18;

export const TOKENS: Record<string, Token> = {
    MATIC: {
        symbol: 'MATIC',
        name: "Polygon",
        decimals: MATIC_DECIMALS,
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png'
    },
    DAI: {
        symbol: 'DAI',
        name: "DAI Stablecoin",
        decimals: 18,
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063/logo.png'
    },
    USDC: {
        symbol: 'USDC',
        name: "USD Coin",
        decimals: 6,
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png'
    },
    USDT: {
        symbol: 'USDT',
        name: "Tether USD",
        decimals: 6,
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        image: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Tether-USDT-icon.png'
    },
    WETH: {
        symbol: 'WETH',
        name: "Wrapped Ether",
        decimals: 18,
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/logo.png'
    },
    WBTC: {
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        decimals: 8,
        address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
        image: 'https://pngimg.com/uploads/bitcoin/small/bitcoin_PNG47.png'
    },
}

const adjustDecimals = (value: string, decimals: number): string =>
    ethers.utils.parseUnits(value || "0", decimals).toString();

type FetchQuoteArgs = {
    fromSymbol: string;
    toSymbol: string;
    takerAddress: string | undefined;
} & ({ sellAmount: string } | { buyAmount: string })

type FetchQuoteResponse = {
    quote: Quote;
    convert: {
        tx: ethers.PopulatedTransaction | null;
        error: string | null;
    }
}

export const getAllowanceTx = async (symbol: string, signer: ethers.Signer, allowanceTarget: string) => {
    const abi = ["function approve(address spender, uint256 amount) returns (bool)"]
    if (!TOKENS[symbol]) throw new Error("Token not found");

    const contract = new ethers.Contract(TOKENS[symbol].address, abi, signer);
    const tx = contract.populateTransaction.approve(allowanceTarget, ethers.constants.MaxUint256);
    return tx;
}

const ZeroXQuoteUrl = 'https://polygon.api.0x.org/swap/v1/quote?';

export const fetchQuote = async (args: FetchQuoteArgs): Promise<FetchQuoteResponse> => {
    const fromToken = TOKENS[args.fromSymbol];
    const toToken = TOKENS[args.toSymbol];
    if (!fromToken || !toToken) {
        throw new Error(`Invalid token symbol: ${args.fromSymbol} or ${args.toSymbol}`);
    }
    const params = new URLSearchParams({
        sellToken: fromToken.address,
        buyToken: toToken.address,
    })
    if ('sellAmount' in args) {
        params.append('sellAmount', adjustDecimals(args.sellAmount, fromToken.decimals));
    } else {
        params.append('buyAmount', adjustDecimals(args.buyAmount, toToken.decimals));
    }
    const quotePromise = fetch(ZeroXQuoteUrl + params.toString());
    let convertPromise: Promise<Response> | undefined = undefined;

    if (args.takerAddress) {
        params.append('takerAddress', args.takerAddress);
        convertPromise = fetch(ZeroXQuoteUrl + params.toString());
    }

    const [quote, convert] = await Promise.all([quotePromise, convertPromise]);

    const [quoteJson, convertJson] = await Promise.all([quote.json(), convert?.json()]);

    const tx = convert?.status === 200 ? {
        to: convertJson.to,
        data: convertJson.data,
        value: BigNumber.from(convertJson.value)
    } : null;

    let error;
    if (convert?.status === 200) {
        error = null;
    } else if (!convertJson) {
        error = "NO_ADDRESS"
    } else if (typeof convertJson.values?.message === "string") {
        error = convertJson.values?.message;
    } else if (typeof convertJson.reason === "string") {
        error = convertJson.reason
    }

    return {
        quote: quoteJson,
        convert: {
            tx,
            error
        }
    };
}

export type Quote = {
    chainId: number;
    price: string;
    guaranteedPrice: string;
    to: string;
    data: string;
    value: string;
    gas: string;
    estimatedGas: string;
    gasPrice: string;
    protocolFee: string;
    minimumProtocolFee: string;
    buyTokenAddress: string;
    sellTokenAddress: string;
    buyAmount: string;
    sellAmount: string;
    allowanceTarget: string;
    sellTokenToEthRate: string;
    buyTokenToEthRate: string;
}

/**
 * @returns amount of second token equal to first token.
 */
export const displayRatio = (firstAmountToEth: string, secondAmountToEth: string, precision = 4) => {
    return (+secondAmountToEth / +firstAmountToEth).toFixed(precision);
}