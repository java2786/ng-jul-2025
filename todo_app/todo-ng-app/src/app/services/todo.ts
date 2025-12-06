import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Todo } from '../models/todo';
  
@Injectable({  
  providedIn: 'root'  
})  
export class TodoService {  
  private apiUrl = 'http://localhost:3000/todos';  
  
  constructor(private http: HttpClient) {}  
  
  // Get all todos  
  // getTodos(): Observable<Todo[]> {  
  //   return this.http.get<Todo[]>(this.apiUrl);  
  // }  
  getTodos() {  
    return this.http.get(this.apiUrl);  
  }  
  
  // Get single todo by id  
  // getTodoById(id: number): Observable<Todo> {  
  //   return this.http.get<Todo>(`${this.apiUrl}/${id}`);  
  // }  
  getTodoById(id: number) {  
    return this.http.get(`${this.apiUrl}/${id}`);  
  }  
  
  // Create new todo  
  // createTodo(todo: Todo): Observable<Todo> {  
  //   return this.http.post<Todo>(this.apiUrl, todo);  
  // }  
  createTodo(todo: Todo) {  
    return this.http.post(this.apiUrl, todo);  
  }  
  
  // Update existing todo  
  // updateTodo(id: number, todo: Todo): Observable<Todo> {  
  //   return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);  
  // }  
  updateTodo(id: number, todo: Todo) {  
    return this.http.put(`${this.apiUrl}/${id}`, todo);  
  }  
  
  // Delete todo  
  // deleteTodo(id: number): Observable<void> {  
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  // }  
  deleteTodo(id: number) {  
    return this.http.delete(`${this.apiUrl}/${id}`);  
  }  
}  