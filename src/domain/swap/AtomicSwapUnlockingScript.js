import dash from 'dash';


class AtomicSwapUnlockingScript extends dash.Core.Script {

    /**
     * Create an unlocking script to spend from an Atomic Swap contract
     * @param {String} secret Secret needed to unlock Atomic Swap contract
     * @param {Script} redeemScript used to create Atomic Swap contract
     * @param {TransactionSignature} signature Signature from spending transaction
     */
    constructor(secret, redeemScript, signature) {
        let sigBuffer = dash.Core.util.buffer.concat([
                signature.signature.toDER(),
                dash.Core.util.buffer.integerAsSingleByteBuffer(dash.Core.crypto.Signature.SIGHASH_ALL)
            ]),
            unlockingScript = super()
                .add(sigBuffer)
                .add(Buffer.from(secret))
                .add(dash.Core.Opcode.OP_TRUE)
                .add(Buffer.from(redeemScript.toHex(), 'hex'));

        return unlockingScript;
    }

    /**
     * Deserialize an atomic swap unlocking script from hex
     * @param {String} hex Hex encoded string
     */
    static fromHex(hex) {
       let script = super.fromHex(hex);

       Object.setPrototypeOf(script, AtomicSwapUnlockingScript.prototype);

       return script;
    }

    /**
     * Returns the secret used to unlock the transaction
     * @returns {String} The secret as a hex string
     */
    getSecret() {
        return this.chunks[1].buf;
    }
}


export { AtomicSwapUnlockingScript }
