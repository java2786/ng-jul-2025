import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo';
  
@Component({  
  selector: 'app-todo-list',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './todo-list.html',  
  styleUrls: ['./todo-list.css']  
})  
export class TodoList implements OnInit {  
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
      next: (data:any) => {  
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