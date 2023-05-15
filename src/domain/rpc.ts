// @ts-ignore
import RpcClient from '@dashevo/dashd-rpc/promise';


let config = {
        protocol: 'http',
        host: 'seed-1.testnet.networks.dash.org',
        port: '3000'
        // protocol: 'http',
        // user: 'dashUser',
        // pass: 'dashPass',
        // host: '127.0.0.1',
        // port: '19898'
    },
    rpc: any;


const connect = () => {
    rpc = new RpcClient(config);
};

const client = () => {
    if (!rpc) {
        connect();
    }

    return rpc;
};


export default { client, connect };
export { client, connect };
