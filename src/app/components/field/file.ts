import { field } from '@esportsplus/ui';


export default (data: Parameters<typeof field.file>[0]) => {
    data.mask = data.mask || {};
    data.mask.class = `field-mask--outline --border-width-400 ${data.mask?.class || ''}`;
    data.mask.style = `
        --background-default: transparent;
        --border-color-active: var(--color-primary-400);
        --border-color-default: var(--color-grey-500);
        --border-color-hover: var(--color-primary-300);
        --border-color-pressed: var(--color-border-400);
        --color-active: var(--color-primary-400);
        --color-hover: var(--color-primary-300);
        --color-pressed: var(--color-primary-500);
        ${data.mask?.style || ''}
    `;

    return field.file(data);
};