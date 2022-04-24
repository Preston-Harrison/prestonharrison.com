import detectEthereumProvider from '@metamask/detect-provider';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Convert/WalletConnectButton.module.scss';
import { Signer, ethers } from 'ethers';

type Props = {
    title?: string;
    address: string | undefined;
    setSigner: (signer: Signer | undefined) => void;
}

const WalletConnectButton = (
    {
        title = "Connect Wallet",
        address,
        setSigner
    }: Props
) => {

    const connectWallet = async () => {
        const ethereum = await detectEthereumProvider() as ethers.providers.ExternalProvider;
        if (!ethereum) return toast.error("Wallet not detected");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const chainId = await provider.send("eth_chainId", []);

        // Converts number to base 16 string, then adds 0x prefix
        if ("0x89" !== chainId) {
            return toast.error(`This chain is not supported, please switch to polygon.`);
        }
        if (!ethereum.request) return toast.error("Unable to connect to wallet");
        await toast.promise(ethereum.request({
            method: "wallet_requestPermissions",
            params: [
                {
                    eth_accounts: {}
                }
            ]
        }), {
            pending: "Wallet connect pending...",
            success: "Wallet connected",
            error: "Wallet connect rejected",
        })
        const signer = provider.getSigner();
        setSigner(signer);
    };

    const disconnectWallet = () => {
        window.location.reload();
    }

    let displayAddress;
    if (address) {
        displayAddress = address.slice(0, 6) + "..." + address.slice(-4);
    }

    return (
        <div className={styles.walletConnectContainer}>
            <button className={styles.connectWallet} onClick={connectWallet} disabled={!!address}>
                <FontAwesomeIcon icon={faWallet} />
                {displayAddress || title}
            </button>
            {displayAddress && <button className={styles.disconnectWallet} onClick={disconnectWallet} >
                Disconnect
            </button>}
        </div>
    )
}

export default WalletConnectButton;