import { text } from '~/app/components/field';


export default (data: Parameters<typeof text>[0]) => {
    data.class = `card --padding-vertical-500 --padding-horizontal-600 ${data.class || ''}`;
    data.style = `
        --background-default: var(--color-white-400);
        ${data.style || ''}
    `;

    return text(data);
};