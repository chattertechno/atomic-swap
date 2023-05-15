import { response } from '@esportsplus/action';
import { alert, form } from '@esportsplus/ui';
import * as ethers from 'ethers';
import { html, reactive } from '~/app';
import { field } from '~/app/components';
import web3 from '~/domain/web3';
import { sha256 } from '~/domain/utilities';


// import './_temp';


function create(template: any) {
    return html`
        <section class="--slide-in">
            <div class="container --flex-center --slide-in" style='--max-width: 400px;min-height: 100vh;padding-bottom: 96px;padding-top: calc(80px + 24px);'>
                <form ${form.action(async ({ input }) => {
                    let options = {
                            value: ethers.BigNumber.from(ethers.utils.parseEther(input.eth).toString())
                        },
                        swap = {
                            dash: input.dash,
                            expiresAt: new Date(input.expiresAt).valueOf() / 1000,
                            secret: `0x${await sha256(input.secret)}`
                        };

                    if (!input.eth) {
                        alert.error('You must provide ETH to continue');
                    }
                    else if (!input.secret) {
                        alert.error('You must provide a secret to continue');
                    }

                    else if (!input.dash) {
                        alert.error('You must provide a dash public address to continue');
                    }
                    else {
                        try {
                            await web3.data.contract!.initializeETH(swap.dash, swap.expiresAt, swap.secret, options).then((response: any) => {
                                response.wait().then((receipt: any) => {
                                    template.refund = true;
                                    window.open(`https://goerli.etherscan.io/tx/${receipt.transactionHash.toString()}`, '_blank');
                                });
                            });

                            alert.success('ETH atomic swap transaction created successfully, the etherscan transaction will open in a new tab once it has been confirmed by the network');
                        }
                        catch (e: any) {
                            let reason = e;

                            if (e.toString) {
                                reason = e.toString();
                            }

                            if (!reason) {
                                reason = e?.error?.error.toString();
                            }

                            if (reason) {
                                reason = reason.split('r: ').pop();
                            }
                            else {
                                reason = e?.error?.reason.split(': ').pop();
                            }

                            if (reason) {
                                reason = `: ${reason}`;
                            }

                            alert.error(`Contract Returned Error${reason}`);
                        }
                    }

                    return response();
                })}>
                    <div class="group group--offset-top --margin-500">

                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'eth',
                                placeholder: 'Total ETH',
                                title: 'Ethereum',
                                type: 'number'
                            })}
                        </div>

                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'expiresAt',
                                title: 'Swap should expire after',
                                type: 'datetime-local',
                                value: timestampToDatetimeInputString(Date.now() + 3600000)
                            })}
                        </div>

                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'dash',
                                title: 'Your DASH Public Key',
                                type: 'string'
                            })}
                        </div>

                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'secret',
                                title: 'Lock funds with a secret',
                                type: 'string'
                            })}
                        </div>

                        <div class="group-item --padding-top --padding-200 --width-full">
                            <button class="button --background-black --background-state --border-width-600 --color-state --color-white --padding-600 --text-bold-600 --text-uppercase --text-200 --width-full">
                                Initiate Swap
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </section>
    `
}

function refund({ amount, dash, expiresAt, secret }: any, template: any) {
    return html`
        <section class="--slide-in">
            <div class="container --flex-center --slide-in" style='--max-width: 400px;min-height: 100vh;padding-bottom: 96px;padding-top: calc(80px + 24px);'>
                <div class="group group--offset-top --margin-500">
                    <div class="group-item --width-full">
                        <div class='text-list'>
                            <b class='text --color-text-500'>
                                ETH
                            </b>
                            <div class='text'>
                                ${ethers.utils.formatEther(amount)} ETH
                            </div>
                        </div>
                    </div>

                    <div class="group-item --width-full">
                        <div class='text-list'>
                            <b class='text --color-text-500'>
                                Your DASH Public Key
                            </b>
                            <div class='text' style='word-break: break-all'>
                                ${dash}
                            </div>
                        </div>
                    </div>

                    <div class="group-item --width-full">
                        <div class='text-list'>
                            <b class='text --color-text-500'>
                                Swap Expires After
                            </b>
                            <div class='text'>
                                ${new Date(expiresAt * 1000).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div class="group-item --width-full">
                        <div class='text-list'>
                            <b class='text --color-text-500'>
                                Hashed Secret
                            </b>
                            <div class='text'>
                                <span class='--text-truncate'>
                                    ${secret}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="group-item ${expiresAt > Date.now() / 1000 ? '--not-allowed' : ''} --flex-column --padding-top --padding-300 --width-full">
                        <div class="button --background-black --background-state --border-radius-500 --color-state --color-white ${expiresAt > Date.now() / 1000 ? '--disabled' : ''} --padding-500 --width-full" onclick='${async () => {
                            try {
                                await web3.data.contract!.refund().then((response: any) => {
                                    response.wait().then((receipt: any) => {
                                        template.refund = false;
                                        window.open(`https://goerli.etherscan.io/tx/${receipt.transactionHash.toString()}`, '_blank');
                                    });
                                });

                                alert.success('Refund transaction created successfully, the etherscan transaction will open in a new tab once it has been confirmed by the network');
                            }
                            catch (e: any) {
                                let reason = e;

                                if (e.toString) {
                                    reason = e.toString();
                                }

                                if (!reason) {
                                    reason = e?.error?.error.toString();
                                }

                                if (reason) {
                                    reason = reason.split('r: ').pop();
                                }
                                else {
                                    reason = e?.error?.reason.split(': ').pop();
                                }

                                if (reason) {
                                    reason = `: ${reason}`;
                                }

                                alert.error(`Contract Returned Error${reason}`);
                            }
                        }}'>
                            Refund Swap
                        </div>

                        ${expiresAt > Date.now() / 1000 ? "<div class='--margin-top --margin-200 --text-300'>Swap cannot be refunded until it expires</div>" : ''}
                    </div>
                </div>

            </div>
        </section>
    `;
}

function timestampToDatetimeInputString(timestamp: number) {
    const date = new Date((timestamp + new Date().getTimezoneOffset() * -60 * 1000));

    // slice(0, 19) includes seconds
    return date.toISOString().slice(0, 19);
}


export default async () => {
    let data: Record<PropertyKey, any> = {},
        template = reactive({
            refund: false
        });

    await web3.connect();

    if (web3.data.signer) {
        let address = await web3.data.signer.getAddress();

        if (address) {
            data = await web3.data.contract!._swaps(address);

            if (data.dash) {
                template.refund = true;
            }
        }
    }

    return () => template.refund ? refund(data, template) : create(template);
};