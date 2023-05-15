import { effect, reactive } from '@esportsplus/reactivity';
import { component, html } from '@esportsplus/template';
import { redirect, routes, Request } from '@esportsplus/routing';
import tasks from '@esportsplus/tasks';


const data = reactive<{
    request: Request;
}>({
    // @ts-ignore
    request: null
});

const raf = tasks.raf();

const task = tasks.task();


export default { component, data, effect, html, raf, reactive, redirect, routes, task };
export { component, data, effect, html, raf, reactive, redirect, routes, task };


