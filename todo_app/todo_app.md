# Angular 20 Todo Application - Complete Tutorial Series  
  
**For Beginner Students | Step-by-Step Practical Guide**  
  
---  
  
## Overview  
  
This tutorial will help you build a complete Todo application using Angular 20. You'll create a login system, connect to a backend using json-server, and implement all CRUD (Create, Read, Update, Delete) operations.  
  
**What You'll Build:**  
- Login page with authentication  
- Todo list display  
- Add new todos  
- Edit existing todos  
- Delete todos  
- Backend API integration using json-server  
  
**Technologies:**  
- Angular 20  
- TypeScript  
- json-server (fake REST API)  
- RxJS Observables  
  
---  
  
## Prerequisites Setup  
  
Before starting, install these tools:  
  
1. **Node.js** (version 18 or above)  
2. **Angular CLI** - Run: `npm install -g @angular/cli@20`  
3. **json-server** - Run: `npm install -g json-server`  
  
---  
  
# STEP 1: Create Basic Angular Application  
  
## What You'll Do  
Create a new Angular project and run it to see the default page.  
  
## Commands to Run  
  
```bash  
ng new todo-app  
```  
  
**When prompted, choose:**  
- Would you like to add Angular routing? → **Yes**  
- Which stylesheet format? → **CSS**  
  
```bash  
cd todo-app  
ng serve  
```  
  
Open browser: `http://localhost:4200`  
  
## What You Should See  
Default Angular welcome page  
  
## Understanding the Project Structure  
  
```  
todo-app/  
├── src/  
│   ├── app/  
│   │   ├── app.component.ts    (Main component)  
│   │   ├── app.component.html  (Main template)  
│   │   ├── app.component.css   (Main styles)  
│   │   └── app.config.ts       (App configuration)  
│   └── index.html              (Main HTML file)  
```  
  
**Checkpoint:** Your app should run successfully at localhost:4200  
  
---  
  
# STEP 2: Clean Up and Create Basic Structure  
  
## What You'll Do  
Remove default content and create a simple header.  
  
## File: `src/app/app.component.html`  
  
**Replace entire content with:**  
  
```html  
<div class="app-container">  
  <header>  
    <h1>Todo Application</h1>  
  </header>  
    
  <main>  
    <router-outlet></router-outlet>  
  </main>  
</div>  
```  
  
## File: `src/app/app.component.css`  
  
```css  
.app-container {  
  max-width: 800px;  
  margin: 0 auto;  
  padding: 20px;  
}  
  
header {  
  background-color: #4CAF50;  
  color: white;  
  padding: 20px;  
  text-align: center;  
  border-radius: 5px;  
  margin-bottom: 20px;  
}  
  
header h1 {  
  margin: 0;  
}  
  
main {  
  background-color: #f4f4f4;  
  padding: 20px;  
  border-radius: 5px;  
  min-height: 400px;  
}  
```  
  
**Checkpoint:** You should see a green header with "Todo Application" title and gray content area.  
  
---  
  
# STEP 3: Create Login Component  
  
## What You'll Do  
Create a login page component where users will enter credentials.  
  
## Command to Run  
  
```bash  
ng generate component login  
```  
  
This creates:  
- `src/app/login/login.component.ts`  
- `src/app/login/login.component.html`  
- `src/app/login/login.component.css`  
  
## File: `src/app/login/login.component.html`  
  
```html  
<div class="login-container">  
  <div class="login-box">  
    <h2>Login to Todo App</h2>  
      
    <div class="form-group">  
      <label>Username:</label>  
      <input   
        type="text"   
        [(ngModel)]="username"   
        placeholder="Enter username"  
        class="input-field">  
    </div>  
      
    <div class="form-group">  
      <label>Password:</label>  
      <input   
        type="password"   
        [(ngModel)]="password"   
        placeholder="Enter password"  
        class="input-field">  
    </div>  
      
    <div *ngIf="errorMessage" class="error-message">  
      {{ errorMessage }}  
    </div>  
      
    <button (click)="login()" class="login-button">Login</button>  
  </div>  
</div>  
```  
  
## File: `src/app/login/login.component.css`  
  
```css  
.login-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  min-height: 400px;  
}  
  
.login-box {  
  background-color: white;  
  padding: 30px;  
  border-radius: 8px;  
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);  
  width: 100%;  
  max-width: 400px;  
}  
  
.login-box h2 {  
  text-align: center;  
  color: #333;  
  margin-bottom: 30px;  
}  
  
.form-group {  
  margin-bottom: 20px;  
}  
  
.form-group label {  
  display: block;  
  margin-bottom: 5px;  
  color: #555;  
  font-weight: bold;  
}  
  
.input-field {  
  width: 100%;  
  padding: 10px;  
  border: 1px solid #ddd;  
  border-radius: 4px;  
  font-size: 14px;  
  box-sizing: border-box;  
}  
  
.input-field:focus {  
  outline: none;  
  border-color: #4CAF50;  
}  
  
.login-button {  
  width: 100%;  
  padding: 12px;  
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  font-size: 16px;  
  cursor: pointer;  
}  
  
.login-button:hover {  
  background-color: #45a049;  
}  
  
.error-message {  
  color: red;  
  text-align: center;  
  margin-bottom: 15px;  
  padding: 10px;  
  background-color: #ffebee;  
  border-radius: 4px;  
}  
```  
  
## File: `src/app/login/login.component.ts`  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-login',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']  
})  
export class LoginComponent {  
  username: string = '';  
  password: string = '';  
  errorMessage: string = '';  
  
  constructor(private router: Router) {}  
  
  login() {  
    // Hard-coded credentials  
    const validUsername = 'admin';  
    const validPassword = 'admin@123';  
  
    if (this.username === validUsername && this.password === validPassword) {  
      // Login successful  
      console.log('Login successful!');  
      this.errorMessage = '';  
      // Navigate to todo list (we'll create this later)  
      this.router.navigate(['/todos']);  
    } else {  
      // Login failed  
      this.errorMessage = 'Invalid username or password!';  
    }  
  }  
}  
```  
  
**Checkpoint:** Login component is created but not visible yet. We'll configure routing next.  
  
---  
  
# STEP 4: Setup Routing  
  
## What You'll Do  
Configure routes so login page shows first, then todo list after successful login.  
  
## File: `src/app/app.routes.ts`  
  
**Replace entire content with:**  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './login/login.component';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  { path: 'todos', component: LoginComponent } // Temporary, will replace later  
];  
```  
  
**Checkpoint:**   
- Open `http://localhost:4200`  
- You should see the login page  
- Try logging in with: **Username:** admin, **Password:** admin@123  
- Error should show if credentials are wrong  
  
---  
  
# STEP 5: Create Todo Model  
  
## What You'll Do  
Define the structure of a Todo item.  
  
## Create New File: `src/app/models/todo.model.ts`  
  
First, create the `models` folder:  
  
```bash  
mkdir src/app/models  
```  
  
Then create the file:  
  
```typescript  
export interface Todo {  
  id: number;  
  title: string;  
  description: string;  
  completed: boolean;  
  assignedTo: string;  
  createdDate: string;  
}  
```  
  
**Understanding the Model:**  
- `id`: Unique identifier for each todo  
- `title`: Short name of the task (e.g., "Complete Angular Tutorial")  
- `description`: Detailed information about the task  
- `completed`: Whether task is done or not (true/false)  
- `assignedTo`: Person responsible (e.g., "Suresh", "Ramesh")  
- `createdDate`: When the todo was created  
  
**Checkpoint:** Model file is created. We'll use this in the next step.  
  
---  
  
# STEP 6: Create Todo List Component  
  
## What You'll Do  
Create a component to display the list of todos.  
  
## Command to Run  
  
```bash  
ng generate component todo-list  
```  
  
## File: `src/app/todo-list/todo-list.component.html`  
  
```html  
<div class="todo-list-container">  
  <div class="header-section">  
    <h2>My Todo List</h2>  
    <button class="logout-button" (click)="logout()">Logout</button>  
  </div>  
    
  <div class="todos">  
    <div class="todo-item">  
      <h3>Complete Angular Tutorial</h3>  
      <p><strong>Description:</strong> Finish all steps of the todo app tutorial</p>  
      <p><strong>Assigned to:</strong> Suresh</p>  
      <p><strong>Status:</strong> Pending</p>  
      <div class="todo-actions">  
        <button class="edit-button">Edit</button>  
        <button class="delete-button">Delete</button>  
        <button class="complete-button">Mark Complete</button>  
      </div>  
    </div>  
  </div>  
</div>  
```  
  
## File: `src/app/todo-list/todo-list.component.css`  
  
```css  
.todo-list-container {  
  padding: 20px;  
}  
  
.header-section {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 30px;  
}  
  
.header-section h2 {  
  color: #333;  
  margin: 0;  
}  
  
.logout-button {  
  padding: 10px 20px;  
  background-color: #f44336;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.logout-button:hover {  
  background-color: #da190b;  
}  
  
.todos {  
  display: flex;  
  flex-direction: column;  
  gap: 15px;  
}  
  
.todo-item {  
  background-color: white;  
  padding: 20px;  
  border-radius: 8px;  
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);  
}  
  
.todo-item h3 {  
  color: #4CAF50;  
  margin: 0 0 10px 0;  
}  
  
.todo-item p {  
  margin: 5px 0;  
  color: #555;  
}  
  
.todo-actions {  
  margin-top: 15px;  
  display: flex;  
  gap: 10px;  
}  
  
.edit-button {  
  padding: 8px 15px;  
  background-color: #2196F3;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.delete-button {  
  padding: 8px 15px;  
  background-color: #f44336;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.complete-button {  
  padding: 8px 15px;  
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.edit-button:hover {  
  background-color: #0b7dda;  
}  
  
.delete-button:hover {  
  background-color: #da190b;  
}  
  
.complete-button:hover {  
  background-color: #45a049;  
}  
```  
  
## File: `src/app/todo-list/todo-list.component.ts`  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-todo-list',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './todo-list.component.html',  
  styleUrls: ['./todo-list.component.css']  
})  
export class TodoListComponent {  
  constructor(private router: Router) {}  
  
  logout() {  
    this.router.navigate(['/login']);  
  }  
}  
```  
  
## Update Routes: `src/app/app.routes.ts`  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './login/login.component';  
import { TodoListComponent } from './todo-list/todo-list.component';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  { path: 'todos', component: TodoListComponent }  
];  
```  
  
**Checkpoint:**  
- Login with admin/admin@123  
- You should see todo list page with one hardcoded todo  
- Logout button should take you back to login  
  
---  
  
# STEP 7: Display Multiple Todos Using Array  
  
## What You'll Do  
Replace hardcoded todo with an array of todos using *ngFor.  
  
## File: `src/app/todo-list/todo-list.component.ts`  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  
import { Todo } from '../models/todo.model';  
  
@Component({  
  selector: 'app-todo-list',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './todo-list.component.html',  
  styleUrls: ['./todo-list.component.css']  
})  
export class TodoListComponent {  
  todos: Todo[] = [  
    {  
      id: 1,  
      title: 'Complete Angular Tutorial',  
      description: 'Finish all steps of the todo app tutorial',  
      completed: false,  
      assignedTo: 'Suresh',  
      createdDate: '2025-01-15'  
    },  
    {  
      id: 2,  
      title: 'Book Train Ticket',  
      description: 'Book ticket from Chennai to Pune on Indian Railways website',  
      completed: false,  
      assignedTo: 'Ramesh',  
      createdDate: '2025-01-16'  
    },  
    {  
      id: 3,  
      title: 'Pay LIC Premium',  
      description: 'Pay monthly LIC premium before due date',  
      completed: true,  
      assignedTo: 'Mahesh',  
      createdDate: '2025-01-14'  
    }  
  ];  
  
  constructor(private router: Router) {}  
  
  logout() {  
    this.router.navigate(['/login']);  
  }  
}  
```  
  
## File: `src/app/todo-list/todo-list.component.html`  
  
```html  
<div class="todo-list-container">  
  <div class="header-section">  
    <h2>My Todo List</h2>  
    <button class="logout-button" (click)="logout()">Logout</button>  
  </div>  
    
  <div class="todos">  
    <div class="todo-item" *ngFor="let todo of todos">  
      <h3>{{ todo.title }}</h3>  
      <p><strong>Description:</strong> {{ todo.description }}</p>  
      <p><strong>Assigned to:</strong> {{ todo.assignedTo }}</p>  
      <p><strong>Created:</strong> {{ todo.createdDate }}</p>  
      <p><strong>Status:</strong>   
        <span [class.completed]="todo.completed">  
          {{ todo.completed ? 'Completed' : 'Pending' }}  
        </span>  
      </p>  
      <div class="todo-actions">  
        <button class="edit-button">Edit</button>  
        <button class="delete-button">Delete</button>  
        <button class="complete-button" *ngIf="!todo.completed">  
          Mark Complete  
        </button>  
      </div>  
    </div>  
  </div>  
</div>  
```  
  
## Add to `src/app/todo-list/todo-list.component.css`  
  
```css  
.completed {  
  color: #4CAF50;  
  font-weight: bold;  
}  
```  
  
**Checkpoint:**  
- You should see 3 different todos displayed  
- Each todo shows its own information  
- Completed todo shows "Completed" in green  
  
---  
  
# STEP 8: Setup json-server Backend  
  
## What You'll Do  
Create a fake REST API using json-server to store todos.  
  
## Create File: `db.json` (in project root folder)  
  
Create this file in the main `todo-app` folder (same level as `package.json`):  
  
```json  
{  
  "todos": [  
    {  
      "id": 1,  
      "title": "Complete Angular Tutorial",  
      "description": "Finish all steps of the todo app tutorial",  
      "completed": false,  
      "assignedTo": "Suresh",  
      "createdDate": "2025-01-15"  
    },  
    {  
      "id": 2,  
      "title": "Book Train Ticket",  
      "description": "Book ticket from Chennai to Pune on Indian Railways website",  
      "completed": false,  
      "assignedTo": "Ramesh",  
      "createdDate": "2025-01-16"  
    },  
    {  
      "id": 3,  
      "title": "Pay LIC Premium",  
      "description": "Pay monthly LIC premium before due date",  
      "completed": true,  
      "assignedTo": "Mahesh",  
      "createdDate": "2025-01-14"  
    }  
  ]  
}  
```  
  
## Start json-server  
  
**Open a NEW terminal** (keep ng serve running in the first terminal):  
  
```bash  
json-server --watch db.json --port 3000  
```  
  
**Checkpoint:**  
- Open browser: `http://localhost:3000/todos`  
- You should see JSON data of all todos  
- Keep this terminal running  
  
**Available API Endpoints:**  
- GET `http://localhost:3000/todos` - Get all todos  
- GET `http://localhost:3000/todos/1` - Get todo with id 1  
- POST `http://localhost:3000/todos` - Create new todo  
- PUT `http://localhost:3000/todos/1` - Update todo with id 1  
- DELETE `http://localhost:3000/todos/1` - Delete todo with id 1  
  
---  
  
# STEP 9: Create Todo Service  
  
## What You'll Do  
Create a service to communicate with the backend API using HTTP calls and Observables.  
  
## Command to Run  
  
```bash  
ng generate service services/todo  
```  
  
This creates: `src/app/services/todo.service.ts`  
  
## File: `src/app/services/todo.service.ts`  
  
```typescript  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Todo } from '../models/todo.model';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class TodoService {  
  private apiUrl = 'http://localhost:3000/todos';  
  
  constructor(private http: HttpClient) {}  
  
  // Get all todos  
  getTodos(): Observable<Todo[]> {  
    return this.http.get<Todo[]>(this.apiUrl);  
  }  
  
  // Get single todo by id  
  getTodoById(id: number): Observable<Todo> {  
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);  
  }  
  
  // Create new todo  
  createTodo(todo: Todo): Observable<Todo> {  
    return this.http.post<Todo>(this.apiUrl, todo);  
  }  
  
  // Update existing todo  
  updateTodo(id: number, todo: Todo): Observable<Todo> {  
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);  
  }  
  
  // Delete todo  
  deleteTodo(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }  
}  
```  
  
**Understanding Observables:**  
- Observables are like promises but more powerful  
- They handle asynchronous operations (like API calls)  
- You need to **subscribe** to them to get the data  
- They can emit multiple values over time  
- They can be cancelled  
  
**Checkpoint:** Service is created but not used yet. We'll connect it to the component next.  
  
---  
  
# STEP 10: Configure HttpClient  
  
## What You'll Do  
Enable HTTP calls in your Angular application.  
  
## File: `src/app/app.config.ts`  
  
**Replace entire content with:**  
  
```typescript  
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';  
import { provideRouter } from '@angular/router';  
import { provideHttpClient } from '@angular/common/http';  
import { routes } from './app.routes';  
  
export const appConfig: ApplicationConfig = {  
  providers: [  
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideRouter(routes),  
    provideHttpClient()  
  ]  
};  
```  
  
**Checkpoint:** HttpClient is now available. No visible changes yet.  
  
---  
  
# STEP 11: Fetch Todos from Backend  
  
## What You'll Do  
Replace hardcoded array with real API data using Observables.  
  
## File: `src/app/todo-list/todo-list.component.ts`  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  
import { Todo } from '../models/todo.model';  
import { TodoService } from '../services/todo.service';  
  
@Component({  
  selector: 'app-todo-list',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './todo-list.component.html',  
  styleUrls: ['./todo-list.component.css']  
})  
export class TodoListComponent implements OnInit {  
  todos: Todo[] = [];  
  loading: boolean = true;  
  errorMessage: string = '';  
  
  constructor(  
    private router: Router,  
    private todoService: TodoService  
  ) {}  
  
  ngOnInit(): void {  
    this.loadTodos();  
  }  
  
  loadTodos(): void {  
    this.loading = true;  
    this.todoService.getTodos().subscribe({  
      next: (data) => {  
        this.todos = data;  
        this.loading = false;  
        console.log('Todos loaded from API:', data);  
      },  
      error: (error) => {  
        console.error('Error loading todos:', error);  
        this.errorMessage = 'Failed to load todos from server';  
        this.loading = false;  
      }  
    });  
  }  
  
  logout() {  
    this.router.navigate(['/login']);  
  }  
}  
```  
  
## Update HTML to show loading state: `src/app/todo-list/todo-list.component.html`  
  
```html  
<div class="todo-list-container">  
  <div class="header-section">  
    <h2>My Todo List</h2>  
    <button class="logout-button" (click)="logout()">Logout</button>  
  </div>  
    
  <div *ngIf="loading" class="loading">Loading todos...</div>  
    
  <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>  
    
  <div class="todos" *ngIf="!loading && !errorMessage">  
    <div class="todo-item" *ngFor="let todo of todos">  
      <h3>{{ todo.title }}</h3>  
      <p><strong>Description:</strong> {{ todo.description }}</p>  
      <p><strong>Assigned to:</strong> {{ todo.assignedTo }}</p>  
      <p><strong>Created:</strong> {{ todo.createdDate }}</p>  
      <p><strong>Status:</strong>   
        <span [class.completed]="todo.completed">  
          {{ todo.completed ? 'Completed' : 'Pending' }}  
        </span>  
      </p>  
      <div class="todo-actions">  
        <button class="edit-button">Edit</button>  
        <button class="delete-button">Delete</button>  
        <button class="complete-button" *ngIf="!todo.completed">  
          Mark Complete  
        </button>  
      </div>  
    </div>  
  </div>  
</div>  
```  
  
## Add loading and error styles: `src/app/todo-list/todo-list.component.css`  
  
```css  
.loading {  
  text-align: center;  
  padding: 50px;  
  font-size: 18px;  
  color: #666;  
}  
  
.error-message {  
  background-color: #ffebee;  
  color: #c62828;  
  padding: 15px;  
  border-radius: 4px;  
  text-align: center;  
  margin-bottom: 20px;  
}  
```  
  
**Checkpoint:**  
- Make sure json-server is running (`json-server --watch db.json --port 3000`)  
- Login and go to todos page  
- You should see todos loaded from the API  
- Check browser console to see the API response  
  
**Understanding the Code:**  
- `ngOnInit()`: Runs when component loads  
- `subscribe()`: Listens for data from Observable  
- `next`: Function that runs when data arrives successfully  
- `error`: Function that runs if something goes wrong  
  
---  
  
# STEP 12: Create Add Todo Component  
  
## What You'll Do  
Create a form to add new todos.  
  
## Command to Run  
  
```bash  
ng generate component add-todo  
```  
  
## File: `src/app/add-todo/add-todo.component.html`  
  
```html  
<div class="add-todo-container">  
  <div class="form-header">  
    <h2>Add New Todo</h2>  
    <button class="back-button" (click)="goBack()">Back to List</button>  
  </div>  
  
  <form class="todo-form">  
    <div class="form-group">  
      <label>Title:</label>  
      <input   
        type="text"   
        [(ngModel)]="newTodo.title"   
        name="title"  
        placeholder="Enter todo title"  
        class="input-field">  
    </div>  
  
    <div class="form-group">  
      <label>Description:</label>  
      <textarea   
        [(ngModel)]="newTodo.description"   
        name="description"  
        placeholder="Enter description"  
        class="textarea-field"  
        rows="4"></textarea>  
    </div>  
  
    <div class="form-group">  
      <label>Assigned To:</label>  
      <input   
        type="text"   
        [(ngModel)]="newTodo.assignedTo"   
        name="assignedTo"  
        placeholder="Enter person name"  
        class="input-field">  
    </div>  
  
    <div *ngIf="errorMessage" class="error-message">  
      {{ errorMessage }}  
    </div>  
  
    <div *ngIf="successMessage" class="success-message">  
      {{ successMessage }}  
    </div>  
  
    <button   
      type="button"   
      (click)="addTodo()"   
      class="submit-button">  
      Add Todo  
    </button>  
  </form>  
</div>  
```  
  
## File: `src/app/add-todo/add-todo.component.css`  
  
```css  
.add-todo-container {  
  max-width: 600px;  
  margin: 0 auto;  
  padding: 20px;  
}  
  
.form-header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 30px;  
}  
  
.form-header h2 {  
  color: #333;  
  margin: 0;  
}  
  
.back-button {  
  padding: 10px 20px;  
  background-color: #757575;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.back-button:hover {  
  background-color: #616161;  
}  
  
.todo-form {  
  background-color: white;  
  padding: 30px;  
  border-radius: 8px;  
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);  
}  
  
.form-group {  
  margin-bottom: 20px;  
}  
  
.form-group label {  
  display: block;  
  margin-bottom: 5px;  
  color: #555;  
  font-weight: bold;  
}  
  
.input-field,  
.textarea-field {  
  width: 100%;  
  padding: 10px;  
  border: 1px solid #ddd;  
  border-radius: 4px;  
  font-size: 14px;  
  box-sizing: border-box;  
}  
  
.input-field:focus,  
.textarea-field:focus {  
  outline: none;  
  border-color: #4CAF50;  
}  
  
.textarea-field {  
  resize: vertical;  
  font-family: Arial, sans-serif;  
}  
  
.submit-button {  
  width: 100%;  
  padding: 12px;  
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  font-size: 16px;  
  cursor: pointer;  
}  
  
.submit-button:hover {  
  background-color: #45a049;  
}  
  
.error-message {  
  color: #c62828;  
  background-color: #ffebee;  
  padding: 10px;  
  border-radius: 4px;  
  margin-bottom: 15px;  
}  
  
.success-message {  
  color: #2e7d32;  
  background-color: #e8f5e9;  
  padding: 10px;  
  border-radius: 4px;  
  margin-bottom: 15px;  
}  
```  
  
## File: `src/app/add-todo/add-todo.component.ts`  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
import { TodoService } from '../services/todo.service';  
import { Todo } from '../models/todo.model';  
  
@Component({  
  selector: 'app-add-todo',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './add-todo.component.html',  
  styleUrls: ['./add-todo.component.css']  
})  
export class AddTodoComponent {  
  newTodo: Partial<Todo> = {  
    title: '',  
    description: '',  
    assignedTo: '',  
    completed: false  
  };  
  
  errorMessage: string = '';  
  successMessage: string = '';  
  
  constructor(  
    private todoService: TodoService,  
    private router: Router  
  ) {}  
  
  addTodo(): void {  
    // Validation  
    if (!this.newTodo.title || !this.newTodo.description || !this.newTodo.assignedTo) {  
      this.errorMessage = 'Please fill all fields!';  
      return;  
    }  
  
    // Add current date  
    const todoToCreate: Todo = {  
      id: 0, // json-server will auto-generate  
      title: this.newTodo.title,  
      description: this.newTodo.description,  
      assignedTo: this.newTodo.assignedTo,  
      completed: false,  
      createdDate: new Date().toISOString().split('T')[0]  
    };  
  
    // Call service  
    this.todoService.createTodo(todoToCreate).subscribe({  
      next: (response) => {  
        console.log('Todo created:', response);  
        this.successMessage = 'Todo added successfully!';  
        this.errorMessage = '';  
          
        // Navigate back after 1 second  
        setTimeout(() => {  
          this.router.navigate(['/todos']);  
        }, 1000);  
      },  
      error: (error) => {  
        console.error('Error creating todo:', error);  
        this.errorMessage = 'Failed to create todo. Please try again.';  
        this.successMessage = '';  
      }  
    });  
  }  
  
  goBack(): void {  
    this.router.navigate(['/todos']);  
  }  
}  
```  
  
## Update Routes: `src/app/app.routes.ts`  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './login/login.component';  
import { TodoListComponent } from './todo-list/todo-list.component';  
import { AddTodoComponent } from './add-todo/add-todo.component';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  { path: 'todos', component: TodoListComponent },  
  { path: 'add-todo', component: AddTodoComponent }  
];  
```  
  
## Add "Add Todo" button in Todo List: `src/app/todo-list/todo-list.component.html`  
  
Update the header section:  
  
```html  
<div class="header-section">  
  <h2>My Todo List</h2>  
  <div class="header-buttons">  
    <button class="add-button" (click)="addNewTodo()">+ Add Todo</button>  
    <button class="logout-button" (click)="logout()">Logout</button>  
  </div>  
</div>  
```  
  
## Update `src/app/todo-list/todo-list.component.ts`  
  
Add this method:  
  
```typescript  
addNewTodo(): void {  
  this.router.navigate(['/add-todo']);  
}  
```  
  
## Update `src/app/todo-list/todo-list.component.css`  
  
Add these styles:  
  
```css  
.header-buttons {  
  display: flex;  
  gap: 10px;  
}  
  
.add-button {  
  padding: 10px 20px;  
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.add-button:hover {  
  background-color: #45a049;  
}  
```  
  
**Checkpoint:**  
- Go to todo list  
- Click "Add Todo" button  
- Fill the form with sample data:  
  - Title: "Order from Flipkart"  
  - Description: "Order laptop from Flipkart"  
  - Assigned To: "Dinesh"  
- Click "Add Todo"  
- You should see success message and redirect to todo list  
- New todo should appear in the list  
  
---  
  
# STEP 13: Implement Delete Functionality  
  
## What You'll Do  
Connect the delete button to actually remove todos from the backend.  
  
## Update `src/app/todo-list/todo-list.component.ts`  
  
Add the `deleteTodo` method:  
  
```typescript  
deleteTodo(id: number): void {  
  if (confirm('Are you sure you want to delete this todo?')) {  
    this.todoService.deleteTodo(id).subscribe({  
      next: () => {  
        console.log('Todo deleted successfully');  
        // Refresh the list  
        this.loadTodos();  
      },  
      error: (error) => {  
        console.error('Error deleting todo:', error);  
        this.errorMessage = 'Failed to delete todo';  
      }  
    });  
  }  
}  
```  
  
## Update `src/app/todo-list/todo-list.component.html`  
  
Update the delete button:  
  
```html  
<button class="delete-button" (click)="deleteTodo(todo.id)">Delete</button>  
```  
  
**Checkpoint:**  
- Go to todo list  
- Click "Delete" button on any todo  
- Confirm the deletion  
- Todo should disappear from the list  
- Check `http://localhost:3000/todos` to verify it's deleted from backend  
  
---  
  
# STEP 14: Implement Mark Complete Functionality  
  
## What You'll Do  
Make the "Mark Complete" button work to update todo status.  
  
## Update `src/app/todo-list/todo-list.component.ts`  
  
Add the `markComplete` method:  
  
```typescript  
markComplete(todo: Todo): void {  
  const updatedTodo = { ...todo, completed: true };  
    
  this.todoService.updateTodo(todo.id, updatedTodo).subscribe({  
    next: (response) => {  
      console.log('Todo marked as complete:', response);  
      // Refresh the list  
      this.loadTodos();  
    },  
    error: (error) => {  
      console.error('Error updating todo:', error);  
      this.errorMessage = 'Failed to update todo';  
    }  
  });  
}  
```  
  
## Update `src/app/todo-list/todo-list.component.html`  
  
Update the complete button:  
  
```html  
<button class="complete-button" *ngIf="!todo.completed" (click)="markComplete(todo)">  
  Mark Complete  
</button>  
```  
  
**Checkpoint:**  
- Go to todo list  
- Click "Mark Complete" on a pending todo  
- Status should change to "Completed" in green  
- Button should disappear  
- Refresh page - status should remain completed  
  
---  
  
# STEP 15: Create Edit Todo Component  
  
## What You'll Do  
Create a component to edit existing todos.  
  
## Command to Run  
  
```bash  
ng generate component edit-todo  
```  
  
## File: `src/app/edit-todo/edit-todo.component.html`  
  
```html  
<div class="edit-todo-container">  
  <div class="form-header">  
    <h2>Edit Todo</h2>  
    <button class="back-button" (click)="goBack()">Back to List</button>  
  </div>  
  
  <div *ngIf="loading" class="loading">Loading todo details...</div>  
  
  <form class="todo-form" *ngIf="!loading && todo">  
    <div class="form-group">  
      <label>Title:</label>  
      <input   
        type="text"   
        [(ngModel)]="todo.title"   
        name="title"  
        class="input-field">  
    </div>  
  
    <div class="form-group">  
      <label>Description:</label>  
      <textarea   
        [(ngModel)]="todo.description"   
        name="description"  
        class="textarea-field"  
        rows="4"></textarea>  
    </div>  
  
    <div class="form-group">  
      <label>Assigned To:</label>  
      <input   
        type="text"   
        [(ngModel)]="todo.assignedTo"   
        name="assignedTo"  
        class="input-field">  
    </div>  
  
    <div class="form-group">  
      <label>  
        <input   
          type="checkbox"   
          [(ngModel)]="todo.completed"   
          name="completed">  
        Mark as Completed  
      </label>  
    </div>  
  
    <div *ngIf="errorMessage" class="error-message">  
      {{ errorMessage }}  
    </div>  
  
    <div *ngIf="successMessage" class="success-message">  
      {{ successMessage }}  
    </div>  
  
    <button   
      type="button"   
      (click)="updateTodo()"   
      class="submit-button">  
      Update Todo  
    </button>  
  </form>  
</div>  
```  
  
## File: `src/app/edit-todo/edit-todo.component.css`  
  
```css  
.edit-todo-container {  
  max-width: 600px;  
  margin: 0 auto;  
  padding: 20px;  
}  
  
.form-header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 30px;  
}  
  
.form-header h2 {  
  color: #333;  
  margin: 0;  
}  
  
.back-button {  
  padding: 10px 20px;  
  background-color: #757575;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.back-button:hover {  
  background-color: #616161;  
}  
  
.loading {  
  text-align: center;  
  padding: 50px;  
  font-size: 18px;  
  color: #666;  
}  
  
.todo-form {  
  background-color: white;  
  padding: 30px;  
  border-radius: 8px;  
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);  
}  
  
.form-group {  
  margin-bottom: 20px;  
}  
  
.form-group label {  
  display: block;  
  margin-bottom: 5px;  
  color: #555;  
  font-weight: bold;  
}  
  
.input-field,  
.textarea-field {  
  width: 100%;  
  padding: 10px;  
  border: 1px solid #ddd;  
  border-radius: 4px;  
  font-size: 14px;  
  box-sizing: border-box;  
}  
  
.input-field:focus,  
.textarea-field:focus {  
  outline: none;  
  border-color: #2196F3;  
}  
  
.textarea-field {  
  resize: vertical;  
  font-family: Arial, sans-serif;  
}  
  
.submit-button {  
  width: 100%;  
  padding: 12px;  
  background-color: #2196F3;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  font-size: 16px;  
  cursor: pointer;  
}  
  
.submit-button:hover {  
  background-color: #0b7dda;  
}  
  
.error-message {  
  color: #c62828;  
  background-color: #ffebee;  
  padding: 10px;  
  border-radius: 4px;  
  margin-bottom: 15px;  
}  
  
.success-message {  
  color: #2e7d32;  
  background-color: #e8f5e9;  
  padding: 10px;  
  border-radius: 4px;  
  margin-bottom: 15px;  
}  
```  
  
## File: `src/app/edit-todo/edit-todo.component.ts`  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { ActivatedRoute, Router } from '@angular/router';  
import { TodoService } from '../services/todo.service';  
import { Todo } from '../models/todo.model';  
  
@Component({  
  selector: 'app-edit-todo',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './edit-todo.component.html',  
  styleUrls: ['./edit-todo.component.css']  
})  
export class EditTodoComponent implements OnInit {  
  todo: Todo | null = null;  
  loading: boolean = true;  
  errorMessage: string = '';  
  successMessage: string = '';  
  
  constructor(  
    private todoService: TodoService,  
    private route: ActivatedRoute,  
    private router: Router  
  ) {}  
  
  ngOnInit(): void {  
    // Get todo id from URL  
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    this.loadTodo(id);  
  }  
  
  loadTodo(id: number): void {  
    this.todoService.getTodoById(id).subscribe({  
      next: (data) => {  
        this.todo = data;  
        this.loading = false;  
        console.log('Todo loaded for editing:', data);  
      },  
      error: (error) => {  
        console.error('Error loading todo:', error);  
        this.errorMessage = 'Failed to load todo';  
        this.loading = false;  
      }  
    });  
  }  
  
  updateTodo(): void {  
    if (!this.todo) return;  
  
    // Validation  
    if (!this.todo.title || !this.todo.description || !this.todo.assignedTo) {  
      this.errorMessage = 'Please fill all fields!';  
      return;  
    }  
  
    this.todoService.updateTodo(this.todo.id, this.todo).subscribe({  
      next: (response) => {  
        console.log('Todo updated:', response);  
        this.successMessage = 'Todo updated successfully!';  
        this.errorMessage = '';  
          
        // Navigate back after 1 second  
        setTimeout(() => {  
          this.router.navigate(['/todos']);  
        }, 1000);  
      },  
      error: (error) => {  
        console.error('Error updating todo:', error);  
        this.errorMessage = 'Failed to update todo. Please try again.';  
        this.successMessage = '';  
      }  
    });  
  }  
  
  goBack(): void {  
    this.router.navigate(['/todos']);  
  }  
}  
```  
  
## Update Routes: `src/app/app.routes.ts`  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './login/login.component';  
import { TodoListComponent } from './todo-list/todo-list.component';  
import { AddTodoComponent } from './add-todo/add-todo.component';  
import { EditTodoComponent } from './edit-todo/edit-todo.component';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  { path: 'todos', component: TodoListComponent },  
  { path: 'add-todo', component: AddTodoComponent },  
  { path: 'edit-todo/:id', component: EditTodoComponent }  
];  
```  
  
## Update `src/app/todo-list/todo-list.component.ts`  
  
Add the `editTodo` method:  
  
```typescript  
editTodo(id: number): void {  
  this.router.navigate(['/edit-todo', id]);  
}  
```  
  
## Update `src/app/todo-list/todo-list.component.html`  
  
Update the edit button:  
  
```html  
<button class="edit-button" (click)="editTodo(todo.id)">Edit</button>  
```  
  
**Checkpoint:**  
- Go to todo list  
- Click "Edit" button on any todo  
- You should see the edit form with todo details pre-filled  
- Modify the details  
- Click "Update Todo"  
- You should see success message  
- Go back to list - changes should be visible  
  
---  
  
# STEP 16: Add Empty State Message  
  
## What You'll Do  
Show a friendly message when there are no todos.  
  
## Update `src/app/todo-list/todo-list.component.html`  
  
Add this after the loading div:  
  
```html  
<div *ngIf="!loading && !errorMessage && todos.length === 0" class="empty-state">  
  <h3>No Todos Yet!</h3>  
  <p>Click the "Add Todo" button to create your first todo.</p>  
</div>  
```  
  
## Update `src/app/todo-list/todo-list.component.css`  
  
Add this style:  
  
```css  
.empty-state {  
  text-align: center;  
  padding: 50px;  
  background-color: white;  
  border-radius: 8px;  
}  
  
.empty-state h3 {  
  color: #666;  
  margin-bottom: 10px;  
}  
  
.empty-state p {  
  color: #999;  
}  
```  
  
**Checkpoint:**  
- Delete all todos  
- You should see "No Todos Yet!" message  
- Add a new todo to verify everything still works  
  
---  
  
# STEP 17: Understanding Observables - Real Example  
  
## What You'll Do  
Let's see the power of Observables with a practical auto-refresh feature.  
  
## Update `src/app/todo-list/todo-list.component.ts`  
  
Add this import at the top:  
  
```typescript  
import { interval } from 'rxjs';  
```  
  
Add this property in the class:  
  
```typescript  
autoRefresh: boolean = false;  
```  
  
Add this method:  
  
```typescript  
toggleAutoRefresh(): void {  
  this.autoRefresh = !this.autoRefresh;  
    
  if (this.autoRefresh) {  
    // Refresh every 5 seconds  
    interval(5000).subscribe(() => {  
      if (this.autoRefresh) {  
        console.log('Auto-refreshing todos...');  
        this.loadTodos();  
      }  
    });  
  }  
}  
```  
  
## Update `src/app/todo-list/todo-list.component.html`  
  
Add this button in the header-buttons div:  
  
```html  
<button   
  [class.active]="autoRefresh"   
  class="refresh-button"   
  (click)="toggleAutoRefresh()">  
  {{ autoRefresh ? '⏸ Stop Auto-Refresh' : '▶ Start Auto-Refresh' }}  
</button>  
```  
  
## Update `src/app/todo-list/todo-list.component.css`  
  
```css  
.refresh-button {  
  padding: 10px 20px;  
  background-color: #FF9800;  
  color: white;  
  border: none;  
  border-radius: 4px;  
  cursor: pointer;  
}  
  
.refresh-button:hover {  
  background-color: #F57C00;  
}  
  
.refresh-button.active {  
  background-color: #4CAF50;  
}  
```  
  
**Checkpoint:**  
- Click "Start Auto-Refresh" button  
- Open another browser tab to `http://localhost:3000/todos`  
- Manually edit the db.json file or use the json-server API  
- Watch your todo list auto-update every 5 seconds  
- This shows how Observables can handle continuous data streams  
  
**Why Observables are Powerful:**  
- Handle multiple values over time (unlike promises)  
- Can be cancelled/unsubscribed  
- Support operators for transforming data  
- Perfect for real-time applications  
  
---  
  
# Final Project Structure  
  
```  
todo-app/  
├── db.json                          (Backend data)  
├── src/  
│   ├── app/  
│   │   ├── models/  
│   │   │   └── todo.model.ts       (Todo interface)  
│   │   ├── services/  
│   │   │   └── todo.service.ts     (API calls)  
│   │   ├── login/  
│   │   │   ├── login.component.ts  
│   │   │   ├── login.component.html  
│   │   │   └── login.component.css  
│   │   ├── todo-list/  
│   │   │   ├── todo-list.component.ts  
│   │   │   ├── todo-list.component.html  
│   │   │   └── todo-list.component.css  
│   │   ├── add-todo/  
│   │   │   ├── add-todo.component.ts  
│   │   │   ├── add-todo.component.html  
│   │   │   └── add-todo.component.css  
│   │   ├── edit-todo/  
│   │   │   ├── edit-todo.component.ts  
│   │   │   ├── edit-todo.component.html  
│   │   │   └── edit-todo.component.css  
│   │   ├── app.component.ts  
│   │   ├── app.component.html  
│   │   ├── app.component.css  
│   │   ├── app.routes.ts  
│   │   └── app.config.ts  
│   └── index.html  
```  
  
---  
  
# Complete Application Features  
  
✅ **Login System**  
- Username: admin  
- Password: admin@123  
- Error handling for invalid credentials  
  
✅ **View All Todos**  
- Display all todos from backend  
- Show status (Completed/Pending)  
- Loading state  
- Empty state message  
  
✅ **Create Todo**  
- Form with validation  
- Auto-generate date  
- Success/error messages  
- Auto-redirect after creation  
  
✅ **Update Todo**  
- Pre-filled form with existing data  
- Edit title, description, assignedTo  
- Toggle completed status  
- Success/error messages  
  
✅ **Delete Todo**  
- Confirmation dialog  
- Remove from backend  
- Auto-refresh list  
  
✅ **Mark Complete**  
- Update status to completed  
- Visual indication (green color)  
- Hide complete button for completed todos  
  
✅ **Observables Usage**  
- All API calls use Observables  
- Auto-refresh feature demonstrates continuous streams  
- Proper subscribe/unsubscribe pattern  
  
---  
  
# Practice Exercises  
  
## Exercise 1: Add Priority Field  
Add a priority field (High/Medium/Low) to todos:  
1. Update the Todo model  
2. Add dropdown in add/edit forms  
3. Display priority with color coding (Red/Yellow/Green)  
  
## Exercise 2: Search Functionality  
Add a search box to filter todos:  
1. Add input field above todo list  
2. Filter todos based on title or assignedTo  
3. Show count of filtered results  
  
## Exercise 3: Sort Todos  
Add buttons to sort todos:  
1. Sort by date (newest/oldest)  
2. Sort by status (pending first/completed first)  
3. Sort by assignedTo (alphabetically)  
  
## Exercise 4: Todo Statistics  
Show statistics at the top:  
1. Total todos  
2. Completed todos  
3. Pending todos  
4. Completion percentage  
  
## Exercise 5: Due Date Feature  
Add due date functionality:  
1. Add dueDate field to model  
2. Add date picker in forms  
3. Highlight overdue todos in red  
4. Show days remaining for pending todos  
  
---  
  
# Quiz  
  
**Question 1:** What does Observable.subscribe() do?  
a) Creates an HTTP request  
b) Listens for data from an Observable  
c) Deletes a todo  
d) Updates the component  
  
**Answer:** b  
  
---  
  
**Question 2:** What is the purpose of ngOnInit()?  
a) To delete a component  
b) To run code when component is created  
c) To update HTML  
d) To create routes  
  
**Answer:** b  
  
---  
  
**Question 3:** What does *ngFor do?  
a) Loops through an array and creates elements  
b) Shows/hides elements  
c) Makes HTTP calls  
d) Creates routes  
  
**Answer:** a  
  
---  
  
**Question 4:** What HTTP method is used to create a new todo?  
a) GET  
b) PUT  
c) POST  
d) DELETE  
  
**Answer:** c  
  
---  
  
**Question 5:** What is the benefit of using json-server?  
a) It creates components  
b) It provides a fake REST API for development  
c) It styles the application  
d) It compiles TypeScript  
  
**Answer:** b  
  
---  
  
# Key Concepts Summary  
  
**Components:** Building blocks of Angular apps (login, todo-list, add-todo, edit-todo)  
  
**Services:** Centralized place for business logic and API calls (todo.service.ts)  
  
**Models/Interfaces:** Define data structure (todo.model.ts)  
  
**Routing:** Navigate between different views (app.routes.ts)  
  
**Two-way Binding:** [(ngModel)] connects form inputs to component properties  
  
**HttpClient:** Makes HTTP requests to backend API  
  
**Observables:** Handle asynchronous operations, can emit multiple values over time  
  
**Directives:**  
- *ngFor: Loop through arrays  
- *ngIf: Conditionally show/hide elements  
- [class.name]: Add CSS class conditionally  
  
**Lifecycle Hooks:** ngOnInit runs when component initializes  
  
**CRUD Operations:**  
- Create: POST request  
- Read: GET request  
- Update: PUT request  
- Delete: DELETE request  
  
---  
  
# Common Issues and Solutions  
  
**Issue 1: json-server not running**  
- Solution: Open terminal and run `json-server --watch db.json --port 3000`  
  
**Issue 2: CORS errors**  
- Solution: json-server handles CORS by default, restart json-server  
  
**Issue 3: Changes not reflecting**  
- Solution: Save all files and check browser console for errors  
  
**Issue 4: Module not found errors**  
- Solution: Make sure to import CommonModule and FormsModule in standalone components  
  
**Issue 5: Data not loading from API**  
- Solution: Check json-server is running on port 3000, check browser Network tab  
  
---  
  
# Next Steps to Enhance Your Skills  
  
1. **Add form validation** using Angular's built-in validators  
2. **Use RxJS operators** like map, filter, debounceTime  
3. **Add authentication guard** to protect routes  
4. **Implement local storage** to remember login  
5. **Add pagination** for large todo lists  
6. **Create a dashboard** with charts and statistics  
7. **Add categories** or tags to todos  
8. **Implement drag-and-drop** to reorder todos  
9. **Add notifications** using Angular Material Snackbar  
10. **Deploy to production** using Firebase or Netlify  
  
---  
  
# Conclusion  
  
You have successfully built a complete Angular application with:  
- Authentication system  
- Full CRUD operations  
- Backend integration using json-server  
- Observable-based data handling  
- Professional UI with CSS  
- Routing between multiple pages  
  
This project covers the fundamental concepts needed to build real-world Angular applications. Practice these concepts and try the exercises to strengthen your understanding.  
  
**Remember:** The best way to learn Angular is by building projects. Keep coding and experimenting!  
  
---  
  
**Created for beginner students by a professional trainer**  
**Focus: Practical, Incremental, Real-world Examples**