import { field } from '@esportsplus/ui';


const select = (data: Parameters<typeof field.optional.select>[0]) => {
    data.field.mask = data.field.mask || {};
    data.field.mask.class = `field-mask--outline --border-width-400 ${data.field.mask?.class || ''}`;
    data.field.mask.style = `
        --background-active: var(--color-white-400);
        --background-default: var(--color-white-400);
        --background-hover: var(--color-white-400);
        --background-pressed: var(--color-white-400);
        --border-color-active: var(--color-primary-400);
        --border-color-default: var(--color-grey-500);
        --border-color-hover: var(--color-border-300);
        --border-color-pressed: var(--color-border-400);
        ${data.field.mask?.style || ''}
    `;

    data.field.option = data.field.option || {};
    data.field.option.style = `
        --background-active: var(--color-grey-400);
        --background-default: transparent;
        --background-hover: var(--color-grey-300);
        --background-pressed: var(--color-grey-400);
        --color-default: var(--color-text-400);
        ${data.field.option?.style || ''}
    `;

    data.field.tooltip = data.field.tooltip || {};
    data.field.tooltip.class = `--background-white ${data.field.tooltip?.class || ''}`;

    return field.optional.select(data);
};

const text = (data: Parameters<typeof field.optional.text>[0]) => {
    data.field.mask = data.field.mask || {};
    data.field.mask.class = `field-mask--outline --border-width-400 ${data.field.mask?.class || ''}`;
    data.field.mask.style = `
        --background-active: var(--color-white-400);
        --background-default: var(--color-white-400);
        --background-hover: var(--color-white-400);
        --background-pressed: var(--color-white-400);
        --border-color-active: var(--color-primary-400);
        --border-color-default: var(--color-grey-500);
        --border-color-hover: var(--color-border-300);
        --border-color-pressed: var(--color-border-400);
        --box-shadow: none;
        ${data.field.mask?.style || ''}
    `;

    return field.optional.text(data);
};


export default { select, text };
export { select, text };