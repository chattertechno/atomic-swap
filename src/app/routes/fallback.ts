import { routes } from '~/app';
import responder from '~/app/action/initiate';


routes.add({
    name: 'fallback',
    responder
});