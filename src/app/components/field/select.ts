import { field } from '@esportsplus/ui';


export default (data: Parameters<typeof field.select>[0]) => {
    data.mask = data.mask || {};
    data.mask.class = `field-mask--outline --border-width-400 ${data.mask?.class || ''}`;
    data.mask.style = `
        --background-active: var(--color-white-400);
        --background-default: var(--color-white-400);
        --background-hover: var(--color-white-400);
        --background-pressed: var(--color-white-400);
        --border-color-active: var(--color-primary-400);
        --border-color-default: var(--color-grey-500);
        --border-color-hover: var(--color-border-300);
        --border-color-pressed: var(--color-border-400);
        ${data.mask?.style || ''}
    `;

    data.option = data.option || {};
    data.option.style = `
        --background-active: var(--color-grey-400);
        --background-default: transparent;
        --background-hover: var(--color-grey-300);
        --background-pressed: var(--color-grey-400);
        --color-default: var(--color-text-400);
        ${data.option?.style || ''}
    `;

    data.tooltip = data.tooltip || {};
    data.tooltip.class = `--background-white ${data.tooltip?.class || ''}`;

    return field.select(data);
};