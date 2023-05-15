import { listener, middleware, url } from '@esportsplus/routing';
import { component, data, raf, routes, task } from '~/app';
import { root } from '~/app/components';


// Bind popstate event for routing
listener(data, url.parse);

// Render
component(document.body, raf, task).render(
    root.layout(
        middleware.common.match(routes),
        middleware.common.dispatch
    )
);

