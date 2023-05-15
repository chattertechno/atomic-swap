import { middleware, Middleware } from '@esportsplus/routing';
import { alert, overlay, page, site } from '@esportsplus/ui';
import { header } from '~/app/components';
import { data, html } from '~/app';


export default async (...stack: Middleware[]) => {
    let pipeline = middleware.factory(...stack);

    return html`
        ${site({
            content: page.layout({
                content: html`
                    ${header}
                    ${async () => await pipeline( data.request )}
                    <section class="banner banner--fixed page-background"></section>
                `
            })
        })}

        ${overlay({
            content: [
                alert.html()
            ]
        })}
    `;
};