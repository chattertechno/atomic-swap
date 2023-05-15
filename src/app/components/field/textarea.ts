import { field } from '@esportsplus/ui';


export default (data: Parameters<typeof field.text>[0]) => {
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

    return field.textarea(data);
};