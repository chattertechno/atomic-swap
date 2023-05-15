import { scheduler } from '@esportsplus/reactivity';
import { worker } from '@esportsplus/tasks';
import { raf, task } from '~/app';


let tasks = worker();

tasks.schedulers.add(task);
tasks.schedulers.add(raf);

scheduler.add(tasks);