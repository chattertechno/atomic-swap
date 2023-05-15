import responder from '~/app/action/participate';
import { routes } from '~/app';


routes.add({
    name: 'participate',
    path: '/participate',
    responder
});