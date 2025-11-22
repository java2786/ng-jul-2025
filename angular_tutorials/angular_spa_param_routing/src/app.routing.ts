import { Routes } from "@angular/router";
import { About } from "./app/components/about/about";
import { Home } from "./app/components/home/home";
import { AddTask } from "./app/components/add-task/add-task";
import { TaskList } from "./app/components/task-list/task-list";
import { Task } from "./app/components/task/task";

export const routes:Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'add-task', component: AddTask},
    {path: 'tasks', component: TaskList},
    {path: 'tasks/:id', component: Task},
    {path: '**', redirectTo: ""}
]

// customer/:email/:issue/:region 