import { response } from '@esportsplus/action';
import { alert, form } from '@esportsplus/ui';
import { html, reactive, redirect } from '~/app';
import { field } from '~/app/components';
import web3 from '~/domain/web3';
import participant from '~/domain/participant';


let data: Record<PropertyKey, any> = {},
    initiator: string,
    p: any;


function first(template: any) {
    return html`
        <section class="--slide-in">
            <div class="container --flex-center --slide-in" style='--max-width: 400px;min-height: 100vh;padding-bottom: 96px;padding-top: calc(80px + 24px);'>
                <form ${form.action(async ({ input }) => {
                    if (!input.dash || !input.eth) {
                        alert.error('Provide both addresses to continue');
                    }
                    else {
                        data = await web3.data.contract!._swaps(input.eth);

                        if (!data) {
                            alert.error('Atomic swap does not exist in smart contract');
                        }
                        else {
                            initiator = input.eth;
                            p = participant({
                                dash: {
                                    publicKey: data.dash
                                },
                                expiresAt: data.expiresAt,
                                hash: data.secret.replace('0x', '')
                            },
                            {
                                dash: {
                                    publicKey: input.dash
                                }
                            });

                            template.frame = 'second';
                        }
                    }

                    return response();
                })}>
                    <div class="group group--offset-top --margin-500">
                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'eth',
                                title: 'Public ETH Address Associated With Swap',
                                type: 'string'
                            })}
                        </div>

                        <div class="group-item --width-full">
                            ${field.text({
                                name: 'dash',
                                title: 'Your DASH Public Key',
                                type: 'string'
                            })}
                        </div>

                        <div class="group-item --padding-top --padding-200 --width-full">
                            <button class="button --background-black --background-state --border-radius-500 --color-state --color-white --padding-500 --width-full">
                                Next
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    `;
}

async function inspect() {
    setTimeout(async () => {
        if (!(await p.isRedeemable())) {
            inspect();
        }

        alert.success('Initiator has withdrawn DASH, starting metamask transaction');

        let secret = await p.extractSecret();

        try {
            await web3.data.contract!.redeem(initiator, secret).then((response: any) => {
                response.wait().then((receipt: any) => {
                    redirect('/');
                    window.open(`https://goerli.etherscan.io/tx/${receipt.transactionHash.toString()}`, '_blank');
                });
            });

            alert.success('Redeem transaction created successfully, the etherscan transaction will open in a new tab once it has been confirmed by the network');
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
    }, 120000);
}

function second(template: any) {
    return html`
        <section class="--slide-in">
            <div class="container --flex-center --slide-in" style='--max-width: 400px;min-height: 100vh;padding-bottom: 96px;padding-top: calc(80px + 24px);'>

                <div class="group group--offset-top --margin-500">
                    <div class="group-item --width-full">
                        <div class='card --border --border-dashed --padding --padding-500' style='--border-color-default: var(--color-border-300);'>
                            Send DASH to <b style='word-break: break-all'>${data.dash}</b> to fulfill your part of the swap
                        </div>
                    </div>

                    <div class="group-item --padding-top --padding-200 --width-full">
                        <div class="button --background-black --background-state --border-radius-500 --color-state --color-white --padding-500 --width-full" onclick='${async () => {
                            if (await p.isFunded()) {
                                alert.success('Funding transaction found, waiting for initiator to redeem the DASH');
                                template.frame = 'third';
                            }
                            else {
                                alert.error('Swap address has not been funded yet.');
                            }
                        }}'>
                            Done
                        </div>
                    </div>
                </div>

            </div>
        </section>
    `;
}

function third() {
    return html`
        <section class="--slide-in">
            <div class="container --flex-center --slide-in" style='--max-width: 400px;min-height: 100vh;padding-bottom: 96px;padding-top: calc(80px + 24px);'>

                <div class="group group--offset-top --margin-500">
                    <div class="group-item --width-full">
                        <div class='card --border --border-dashed --border-width-300 --padding --padding-500' style='--border-color-default: var(--color-border-300);'>
                            Once the initiator redeems their Dash you will be able to extract the secret.
                        </div>
                    </div>

                    <div class="group-item --padding-top --padding-200 --width-full">
                        <div class="button button--processing --background-black --border-radius-500 --color-white --padding-500 --width-full"></div>
                    </div>
                </div>

            </div>
        </section>
    `;
}


export default async () => {
    let template = reactive({
            frame: 'first'
        });

    data = {};

    return () => {
        if (template.frame === 'first') {
            return first(template);
        }

        if (template.frame === 'second') {
            return second(template);
        }

        if (template.frame === 'third') {
            inspect();
            return third();
        }
    };
};