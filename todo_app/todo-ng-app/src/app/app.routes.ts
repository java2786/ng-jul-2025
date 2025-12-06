import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { TodoList } from './todo-list/todo-list';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'todos', component: TodoList }, 
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];  