import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from 'ethers';
import { abi, address } from '~/storage/contract';
import { reactive } from "~/app";


declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}


let data = reactive({
        connected: false,
        contract: null as Contract | null,
        signer: null as null | undefined | providers.JsonRpcSigner,
    }),
    provider: providers.Web3Provider | null = null;


const connect = async (reconnect = false): Promise<void> => {
    if (reconnect) {
        data.contract = null;
        data.signer = null;
        provider = null;
    }

    if (provider) {
        return;
    }

    try {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // @ts-ignore
            provider = new providers.Web3Provider( window.ethereum );
            data.signer = provider.getSigner();
            data.contract = new Contract(address, abi, data.signer);
        }
    }
    catch (e) {
        provider = null;
    }

    if (provider) {
        data.connected = true;
    }
};

const isConnected = (): boolean => {
    return provider != null;
};

const reconnect = async (): Promise<void> => {
    await connect(true);
};


// let attempted: boolean = false;

// directive.on('web3.connect', connect);
// emitter.on('components.mount', async () => {
//     if (attempted) {
//         return;
//     }

//     attempted = true;

//     await connect();
// });


export default { connect, data, isConnected, provider, reconnect };
export { connect, data, isConnected, provider, reconnect };
