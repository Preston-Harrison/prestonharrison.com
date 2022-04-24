import type { NextPage } from 'next';
import React from 'react';
import { Signer } from 'ethers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SwapBox from '../components/Convert/SwapBox';
import WalletConnectButton from '../components/Convert/WalletConnectButton';

const Convert: NextPage = () => {
    const [signer, setSigner] = React.useState<Signer>();
    const [address, setAddress] = React.useState<string>();

    React.useEffect(() => {
        signer ? signer.getAddress().then(setAddress) : setAddress(undefined);
    }, [signer])

    return (
        <div>
            <WalletConnectButton address={address} setSigner={setSigner} />
            <SwapBox address={address} signer={signer} setSigner={setSigner} />
            <ToastContainer
                bodyClassName={'toast-body'}
                position={'bottom-right'}
                autoClose={3000}
            />
        </div>
    )
}

export default Convert;