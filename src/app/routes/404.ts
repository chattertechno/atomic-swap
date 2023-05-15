import { redirect, routes } from '~/app';


routes.add({
    name: '404',
    responder: () => redirect('index')
});
