import { html } from '~/app';
import web3 from '~/domain/web3';


let links = [
        {
            href: '/#/',
            label: 'Initiate',
            route: 'faq'
        },
        {
            href: '/#/participate',
            label: 'Participate',
            route: 'participate'
        }
    ];


export default () => {
    return html`
        <section class="header --absolute-top --padding-vertical --padding-800 --slide-in">
            <div class="container">
                <div class="group group--offset-top --margin-100">
                    ${links.map(({ href, label }) => html`
                        <div class="group-item">
                            <a class="button --background-black --color-white --padding-horizontal-400 --padding-vertical-300 --text-bold-600 --text-uppercase --text-200" href="${href}" style='--background-default: transparent;--color-default: var(--color-text-500);'>
                                ${label}
                            </a>
                        </div>
                    `)}

                    <div class="group-item" style='margin-left: auto;'>
                        <div class="button --background-black --color-white --padding-horizontal-400 --padding-vertical-300 --text-bold-600 --text-uppercase --text-200" style='--color-default: var(--color-grey-500);' onclick='${() => {
                            if (web3.data.connected) {
                                return;
                            }

                            web3.connect();
                        }}'>
                            ${() => web3.data.connected ? 'Connected' : 'Connect'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
