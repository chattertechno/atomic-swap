import responder from '~/app/action/initiate';
import { routes } from '~/app';


routes.add({
    name: 'initiate',
    path: '/',
    responder
});