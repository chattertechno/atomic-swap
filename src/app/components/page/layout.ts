import { page } from '@esportsplus/ui';
import { html } from '~/app';


type Data = {
    container?: {
        class?: string;
        width?: string;
    };
    content?: any;
} & Parameters<typeof page.header>[0];


export default (data: Data) => {
    return html`
        <div class="container --slide-in --margin-vertical --margin-900 --padding-vertical-900 ${data?.container?.class || ''}" style="--max-width: ${data?.container?.width || '480px'};">
            ${page.header(data)}
            ${data?.content || ''}
        </div>
    `;
};