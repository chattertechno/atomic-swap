import { optional } from '~/app/components/field';


function theme(data: Record<string, any>) {
    data.class = `card --border --border-dashed --padding-vertical-500 --padding-horizontal-600 ${data.class || ''}`;
    data.style = `
        --background-active: var(--color-white-400);
        --background-default: transparent;
        --background-hover: var(--color-grey-300);
        --background-pressed: var(--color-grey-300);
        --border-color-active: var(--color-white-400);
        --border-color-default: var(--color-border-300);
        --border-color-hover: var(--color-grey-300);
        --border-color-pressed: var(--color-grey-300);
        ${data.style || ''}
    `;

    data.mask ||= {};
    data.mask.style = `
        --background-active: var(--color-primary-300);
        --background-default: var(--color-border-400);
        --background-hover: var(--color-border-300);
        --background-pressed: var(--color-border-500);
    `;

    if (data.field) {
        data.field.style = `
            --max-height-active: 200px;
            ${data.field.style || ''}
        `;
    }

    return data;
}


const select = (data: Parameters<typeof optional.select>[0]) => {
    return optional.select( theme(data) as typeof data );
};

const text = (data: Parameters<typeof optional.text>[0]) => {
    return optional.text( theme(data) as typeof data );
};


export default { select, text };
export { select, text };