import { Routes } from "@angular/router";
import { About } from "./13_spa/components/about/about";
import { Home } from "./13_spa/components/home/home";
import { AddTask } from "./13_spa/components/add-task/add-task";
import { TaskList } from "./13_spa/components/task-list/task-list";

export const routes:Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'add-task', component: AddTask},
    {path: 'tasks', component: TaskList},
    {path: '**', redirectTo: ""}
]