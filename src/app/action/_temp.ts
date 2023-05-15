import dash from 'dash';

// IMPORTANT
// This file is only for testing purposes so I can avoid using a DASH wallet for testing.

// let pk = new dash.PrivateKey('b66e2820d98e98d8efd12a876e9d190a7abf1175ab24372f0d9d2d617467bc02');
//
// console.log({
//     privateKey: pk.toString(),
//     publicKey: pk.toPublicKey().toString(),
//     publicAddress: pk.toPublicKey().toAddress(dash.Networks.testnet).toString()
// });

(async () => {
    try {
        console.log('connecting');

        let wallet = new dash.Wallet({
                network: 'testnet',
                // offlineMode: true,
                privateKey: '69aa426b4f90857366fde8681d41e69a88e8c4eca89c97a8424ec7733a1d4103'
            });

        console.log('connected');

        await wallet.getAccount().then(async (account) => {
            let address = account.getUnusedAddress(),
                balance = account.getTotalBalance();

            console.log({ address, balance });

            if (balance > 0) {
                console.log('sending');

                await account.broadcastTransaction(account.createTransaction({
                    recipient: 'yXiDNhn9SGzGRZxJkGdVyjd8sBubkxDsSs',
                    satoshis: parseInt(`${balance / 10}`, 10),
                })).then(() => {
                    console.log('sent');
                });
            }
        });
    }
    catch (e) {
        console.log(e);
    }
})();