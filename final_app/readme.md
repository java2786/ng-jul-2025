# Employee Management System - Angular v20 Complete Guide

## Introduction

This guide will help you build a complete Employee Management System using Angular v20. This application covers all major Angular concepts you need to master for interviews and real-world development.

**What You'll Build:**
- Full CRUD operations (Create, Read, Update, Delete)
- Component-based architecture
- Routing and navigation
- Forms (Template-driven and Reactive)
- Services and HTTP communication
- Pipes and directives
- State management
- Authentication basics
- JSON Server as backend

---

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- VS Code or any code editor

### Step 1: Install Angular CLI

```bash
npm install -g @angular/cli@20
```

### Step 2: Create New Angular Project

```bash
ng new employee-management-system
```

When prompted:
- Would you like to add Angular routing? **Yes**
- Which stylesheet format would you like to use? **CSS**

### Step 3: Navigate to Project

```bash
cd employee-management-system
```

### Step 4: Install JSON Server

```bash
npm install -g json-server
```

---

## Backend Setup with JSON Server

### Create db.json File

Create a file named `db.json` in your project root:

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Suresh Kumar",
      "email": "suresh.kumar@indianrailways.com",
      "phone": "9876543210",
      "department": "Engineering",
      "position": "Senior Engineer",
      "salary": 85000,
      "dateOfJoining": "2020-03-15",
      "location": "Pune",
      "isActive": true
    },
    {
      "id": 2,
      "name": "Ramesh Patel",
      "email": "ramesh.patel@lic.in",
      "phone": "9876543211",
      "department": "Finance",
      "position": "Accountant",
      "salary": 65000,
      "dateOfJoining": "2021-06-20",
      "location": "Chennai",
      "isActive": true
    },
    {
      "id": 3,
      "name": "Mahesh Sharma",
      "email": "mahesh.sharma@flipkart.com",
      "phone": "9876543212",
      "department": "IT",
      "position": "Software Developer",
      "salary": 95000,
      "dateOfJoining": "2019-08-10",
      "location": "Bangalore",
      "isActive": false
    }
  ],
  "departments": [
    { "id": 1, "name": "Engineering" },
    { "id": 2, "name": "Finance" },
    { "id": 3, "name": "IT" },
    { "id": 4, "name": "HR" },
    { "id": 5, "name": "Sales" }
  ],
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "role": "admin"
    }
  ]
}
```

### Start JSON Server

Open a new terminal and run:

```bash
json-server --watch db.json --port 3000
```

Your backend will be available at `http://localhost:3000`

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── employee-list/
│   │   ├── employee-form/
│   │   ├── employee-detail/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── header/
│   ├── services/
│   │   ├── employee.service.ts
│   │   ├── auth.service.ts
│   │   └── department.service.ts
│   ├── models/
│   │   ├── employee.model.ts
│   │   └── user.model.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── pipes/
│   │   ├── salary-format.pipe.ts
│   │   └── filter.pipe.ts
│   ├── directives/
│   │   └── highlight.directive.ts
│   └── interceptors/
│       └── auth.interceptor.ts
```

### Run command in git bash
```bash
mkdir src/app/components/
mkdir src/app/services/
mkdir src/app/models/
mkdir src/app/guards/
mkdir src/app/pipes/
mkdir src/app/directives/
mkdir src/app/interceptors/

touch src/app/services/employee.service.ts
touch src/app/services/auth.service.ts
touch src/app/services/department.service.ts
touch src/app/models/employee.model.ts
touch src/app/models/user.model.ts
touch src/app/guards/auth.guard.ts
touch src/app/pipes/salary-format.pipe.ts
touch src/app/pipes/filter.pipe.ts
touch src/app/directives/highlight.directive.ts
touch src/app/interceptors/auth.interceptor.ts

# skip
mkdir src/app/components/employee-list/
mkdir src/app/components/employee-form/
mkdir src/app/components/employee-detail/
mkdir src/app/components/dashboard/
mkdir src/app/components/login/
mkdir src/app/components/header/

# use
cd src/app/components
ng g c employee-list
ng g c employee-form
ng g c employee-detail
ng g c dashboard
ng g c login
ng g c header

```
---

## Step-by-Step Implementation

### 1. Create Models

**src/app/models/employee.model.ts**

```typescript
export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  dateOfJoining: string;
  location: string;
  isActive: boolean;
}
```

**src/app/models/user.model.ts**

```typescript
export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}
```

---

### 2. Create Services

**src/app/services/employee.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(this.apiUrl).subscribe(
      employees => this.employeesSubject.next(employees)
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getActiveEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?isActive=true`);
  }

  searchEmployees(term: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?q=${term}`);
  }
}
```

**src/app/services/auth.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users && users.length > 0) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
          throw new Error('Invalid credentials');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
```

**src/app/services/department.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
}
```

---

### 3. Create Auth Guard

**src/app/guards/auth.guard.ts**

```typescript
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
```

---

### 4. Create Custom Pipes

**src/app/pipes/salary-format.pipe.ts**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
  standalone: true
})
export class SalaryFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '₹0';
    
    // Convert to Indian number format
    const formattedValue = value.toLocaleString('en-IN');
    return `₹${formattedValue}`;
  }
}
```

**src/app/pipes/filter.pipe.ts**

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: Employee[], searchText: string): Employee[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.department.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText)
      );
    });
  }
}
```

---

### 5. Create Custom Directive

**src/app/directives/highlight.directive.ts**

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

---

### 6. Create HTTP Interceptor

**src/app/interceptors/auth.interceptor.ts**

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.id}`
      }
    });
  }

  return next(req);
};
```

---

### 7. Create Components

**src/app/components/login/login.component.ts**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
```

**src/app/components/login/login.component.html**

```html
<div class="login-container">
  <div class="login-card">
    <h2>Employee Management System</h2>
    <h3>Login</h3>
    
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          [(ngModel)]="username" 
          name="username" 
          required
          placeholder="Enter username"
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          [(ngModel)]="password" 
          name="password" 
          required
          placeholder="Enter password"
        >
      </div>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <button type="submit" [disabled]="!loginForm.form.valid">
        Login
      </button>
    </form>

    <div class="help-text">
      <p>Default credentials: admin / admin123</p>
    </div>
  </div>
</div>
```

**src/app/components/login/login.component.css**

```css
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}

.login-card h3 {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-weight: normal;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #5568d3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.help-text {
  margin-top: 20px;
  text-align: center;
  color: #888;
  font-size: 13px;
}
```

---

**src/app/components/header/header.component.ts**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
```

**src/app/components/header/header.component.html**

```html
<header class="header">
  <div class="container">
    <div class="logo">
      <h1>EMS</h1>
    </div>
    
    <nav class="nav" *ngIf="authService.isLoggedIn()">
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/employees" routerLinkActive="active">Employees</a>
      <a routerLink="/employees/new" routerLinkActive="active">Add Employee</a>
    </nav>

    <div class="user-section" *ngIf="authService.isLoggedIn()">
      <span class="username">{{ authService.currentUserValue?.username }}</span>
      <button (click)="logout()" class="logout-btn">Logout</button>
    </div>
  </div>
</header>
```

**src/app/components/header/header.component.css**

```css
.header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
}

.nav {
  display: flex;
  gap: 25px;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav a:hover,
.nav a.active {
  background-color: #34495e;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.username {
  font-weight: 500;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: #c0392b;
}
```

---

**src/app/components/dashboard/dashboard.component.ts**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  activeEmployees: number = 0;
  totalSalary: number = 0;
  departmentCount: number = 0;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.totalEmployees = employees.length;
      this.activeEmployees = employees.filter(e => e.isActive).length;
      this.totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
      this.departmentCount = new Set(employees.map(e => e.department)).size;
    });
  }
}
```

**src/app/components/dashboard/dashboard.component.html**

```html
<div class="dashboard-container">
  <h2>Dashboard</h2>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon blue">👥</div>
      <div class="stat-content">
        <h3>Total Employees</h3>
        <p class="stat-number">{{ totalEmployees }}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon green">✓</div>
      <div class="stat-content">
        <h3>Active Employees</h3>
        <p class="stat-number">{{ activeEmployees }}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon orange">💰</div>
      <div class="stat-content">
        <h3>Total Salary</h3>
        <p class="stat-number">₹{{ totalSalary.toLocaleString('en-IN') }}</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon purple">🏢</div>
      <div class="stat-content">
        <h3>Departments</h3>
        <p class="stat-number">{{ departmentCount }}</p>
      </div>
    </div>
  </div>

  <div class="recent-employees">
    <h3>Recent Employees</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let emp of employees.slice(0, 5)">
          <td>{{ emp.name }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.location }}</td>
          <td>
            <span class="status" [class.active]="emp.isActive" [class.inactive]="!emp.isActive">
              {{ emp.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**src/app/components/dashboard/dashboard.component.css**

```css
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.blue { background-color: #e3f2fd; }
.stat-icon.green { background-color: #e8f5e9; }
.stat-icon.orange { background-color: #fff3e0; }
.stat-icon.purple { background-color: #f3e5f5; }

.stat-content h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
  font-weight: normal;
}

.stat-number {
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
}

.recent-employees {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-employees h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px;
  background-color: #f8f9fa;
  color: #555;
  font-weight: 600;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}
```

---

**src/app/components/employee-list/employee-list.component.ts**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { SalaryFormatPipe } from '../../pipes/salary-format.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    SalaryFormatPipe, 
    FilterPipe,
    HighlightDirective
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
        alert('Employee deleted successfully!');
      });
    }
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredEmployees.sort((a, b) => {
      let valueA = a[column as keyof Employee];
      let valueB = b[column as keyof Employee];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = (valueB as string).toLowerCase();
      }

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSearch(): void {
    if (this.searchText.trim()) {
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.department.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.location.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }
}
```

**src/app/components/employee-list/employee-list.component.html**

```html
<div class="employee-list-container">
  <div class="header-section">
    <h2>Employee List</h2>
    <a routerLink="/employees/new" class="btn-primary">Add New Employee</a>
  </div>

  <div class="search-section">
    <input 
      type="text" 
      [(ngModel)]="searchText" 
      (input)="onSearch()"
      placeholder="Search by name, department, or location..."
      class="search-input"
    >
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th (click)="sortBy('id')" appHighlight highlightColor="#f0f0f0">
            ID
            <span *ngIf="sortColumn === 'id'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th (click)="sortBy('name')" appHighlight highlightColor="#f0f0f0">
            Name
            <span *ngIf="sortColumn === 'name'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th (click)="sortBy('email')" appHighlight highlightColor="#f0f0f0">Email</th>
          <th (click)="sortBy('department')" appHighlight highlightColor="#f0f0f0">
            Department
            <span *ngIf="sortColumn === 'department'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th (click)="sortBy('position')" appHighlight highlightColor="#f0f0f0">Position</th>
          <th (click)="sortBy('salary')" appHighlight highlightColor="#f0f0f0">
            Salary
            <span *ngIf="sortColumn === 'salary'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th (click)="sortBy('location')" appHighlight highlightColor="#f0f0f0">
            Location
            <span *ngIf="sortColumn === 'location'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of filteredEmployees" appHighlight highlightColor="#fffacd">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.salary | salaryFormat }}</td>
          <td>{{ employee.location }}</td>
          <td>
            <span class="status" [class.active]="employee.isActive" [class.inactive]="!employee.isActive">
              {{ employee.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td class="actions">
            <a [routerLink]="['/employees', employee.id]" class="btn-view">View</a>
            <a [routerLink]="['/employees', employee.id, 'edit']" class="btn-edit">Edit</a>
            <button (click)="deleteEmployee(employee.id!)" class="btn-delete">Delete</button>
          </td>
        </tr>
        <tr *ngIf="filteredEmployees.length === 0">
          <td colspan="9" class="no-data">No employees found</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**src/app/components/employee-list/employee-list.component.css**

```css
.employee-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h2 {
  color: #2c3e50;
  margin: 0;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.table-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 15px;
  background-color: #2c3e50;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #34495e;
}

td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

tr:hover {
  background-color: #f8f9fa;
}

.status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-view, .btn-edit, .btn-delete {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-weight: 500;
}

.btn-view {
  background-color: #3498db;
  color: white;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-view:hover { background-color: #2980b9; }
.btn-edit:hover { background-color: #e67e22; }
.btn-delete:hover { background-color: #c0392b; }

.no-data {
  text-align: center;
  color: #999;
  padding: 40px;
}
```

---

**src/app/components/employee-form/employee-form.component.ts**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId?: number;
  departments: any[] = [];
  locations = ['Pune', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kolkata'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(10000)]],
      dateOfJoining: ['', Validators.required],
      location: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      this.employeeForm.patchValue(employee);
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
      return;
    }

    const employee: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe(() => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe(() => {
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);
      });
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
}
```

**src/app/components/employee-form/employee-form.component.html**

```html
<div class="form-container">
  <h2>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h2>

  <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
    <div class="form-row">
      <div class="form-group">
        <label for="name">Full Name *</label>
        <input 
          type="text" 
          id="name" 
          formControlName="name"
          placeholder="e.g., Suresh Kumar"
        >
        <div class="error" *ngIf="f['name'].touched && f['name'].errors">
          <span *ngIf="f['name'].errors['required']">Name is required</span>
          <span *ngIf="f['name'].errors['minlength']">Name must be at least 3 characters</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input 
          type="email" 
          id="email" 
          formControlName="email"
          placeholder="suresh@company.com"
        >
        <div class="error" *ngIf="f['email'].touched && f['email'].errors">
          <span *ngIf="f['email'].errors['required']">Email is required</span>
          <span *ngIf="f['email'].errors['email']">Please enter a valid email</span>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="phone">Phone Number *</label>
        <input 
          type="text" 
          id="phone" 
          formControlName="phone"
          placeholder="9876543210"
          maxlength="10"
        >
        <div class="error" *ngIf="f['phone'].touched && f['phone'].errors">
          <span *ngIf="f['phone'].errors['required']">Phone is required</span>
          <span *ngIf="f['phone'].errors['pattern']">Phone must be 10 digits</span>
        </div>
      </div>

      <div class="form-group">
        <label for="department">Department *</label>
        <select id="department" formControlName="department">
          <option value="">Select Department</option>
          <option *ngFor="let dept of departments" [value]="dept.name">
            {{ dept.name }}
          </option>
        </select>
        <div class="error" *ngIf="f['department'].touched && f['department'].errors">
          <span *ngIf="f['department'].errors['required']">Department is required</span>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="position">Position *</label>
        <input 
          type="text" 
          id="position" 
          formControlName="position"
          placeholder="e.g., Senior Engineer"
        >
        <div class="error" *ngIf="f['position'].touched && f['position'].errors">
          <span *ngIf="f['position'].errors['required']">Position is required</span>
        </div>
      </div>

      <div class="form-group">
        <label for="salary">Salary (₹) *</label>
        <input 
          type="number" 
          id="salary" 
          formControlName="salary"
          placeholder="50000"
        >
        <div class="error" *ngIf="f['salary'].touched && f['salary'].errors">
          <span *ngIf="f['salary'].errors['required']">Salary is required</span>
          <span *ngIf="f['salary'].errors['min']">Salary must be at least ₹10,000</span>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="dateOfJoining">Date of Joining *</label>
        <input 
          type="date" 
          id="dateOfJoining" 
          formControlName="dateOfJoining"
        >
        <div class="error" *ngIf="f['dateOfJoining'].touched && f['dateOfJoining'].errors">
          <span *ngIf="f['dateOfJoining'].errors['required']">Date of joining is required</span>
        </div>
      </div>

      <div class="form-group">
        <label for="location">Location *</label>
        <select id="location" formControlName="location">
          <option value="">Select Location</option>
          <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
        </select>
        <div class="error" *ngIf="f['location'].touched && f['location'].errors">
          <span *ngIf="f['location'].errors['required']">Location is required</span>
        </div>
      </div>
    </div>

    <div class="form-group checkbox-group">
      <label>
        <input type="checkbox" formControlName="isActive">
        Active Employee
      </label>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-submit">
        {{ isEditMode ? 'Update Employee' : 'Add Employee' }}
      </button>
      <button type="button" class="btn-cancel" routerLink="/employees">
        Cancel
      </button>
    </div>
  </form>
</div>
```

**src/app/components/employee-form/employee-form.component.css**

```css
.form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
}

.error {
  color: #e74c3c;
  font-size: 13px;
  margin-top: 5px;
}

.checkbox-group {
  margin-top: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-submit, .btn-cancel {
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-submit {
  background-color: #27ae60;
  color: white;
}

.btn-submit:hover {
  background-color: #229954;
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
```

---

**src/app/components/employee-detail/employee-detail.component.ts**

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { SalaryFormatPipe } from '../../pipes/salary-format.pipe';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SalaryFormatPipe],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.loadEmployee();
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {
        alert('Employee deleted successfully!');
        this.router.navigate(['/employees']);
      });
    }
  }
}
```

**src/app/components/employee-detail/employee-detail.component.html**

```html
<div class="detail-container" *ngIf="employee">
  <div class="detail-header">
    <h2>Employee Details</h2>
    <div class="actions">
      <a [routerLink]="['/employees', employee.id, 'edit']" class="btn-edit">Edit</a>
      <button (click)="deleteEmployee()" class="btn-delete">Delete</button>
      <a routerLink="/employees" class="btn-back">Back to List</a>
    </div>
  </div>

  <div class="detail-card">
    <div class="detail-section">
      <h3>Personal Information</h3>
      <div class="info-grid">
        <div class="info-item">
          <label>Full Name:</label>
          <span>{{ employee.name }}</span>
        </div>
        <div class="info-item">
          <label>Email:</label>
          <span>{{ employee.email }}</span>
        </div>
        <div class="info-item">
          <label>Phone:</label>
          <span>{{ employee.phone }}</span>
        </div>
        <div class="info-item">
          <label>Location:</label>
          <span>{{ employee.location }}</span>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <h3>Employment Information</h3>
      <div class="info-grid">
        <div class="info-item">
          <label>Employee ID:</label>
          <span>{{ employee.id }}</span>
        </div>
        <div class="info-item">
          <label>Department:</label>
          <span>{{ employee.department }}</span>
        </div>
        <div class="info-item">
          <label>Position:</label>
          <span>{{ employee.position }}</span>
        </div>
        <div class="info-item">
          <label>Date of Joining:</label>
          <span>{{ employee.dateOfJoining | date: 'dd MMM yyyy' }}</span>
        </div>
        <div class="info-item">
          <label>Salary:</label>
          <span class="salary">{{ employee.salary | salaryFormat }}</span>
        </div>
        <div class="info-item">
          <label>Status:</label>
          <span class="status" [class.active]="employee.isActive" [class.inactive]="!employee.isActive">
            {{ employee.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

**src/app/components/employee-detail/employee-detail.component.css**

```css
.detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h2 {
  color: #2c3e50;
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete, .btn-back {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-back {
  background-color: #95a5a6;
  color: white;
}

.btn-edit:hover { background-color: #e67e22; }
.btn-delete:hover { background-color: #c0392b; }
.btn-back:hover { background-color: #7f8c8d; }

.detail-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-section {
  margin-bottom: 40px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item label {
  color: #7f8c8d;
  font-size: 13px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: 600;
}

.info-item span {
  color: #2c3e50;
  font-size: 16px;
}

.salary {
  color: #27ae60;
  font-weight: 700;
  font-size: 18px;
}

.status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
  width: fit-content;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
```

---

### 8. Configure Routing

**src/app/app.routes.ts**

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees', 
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/new', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id/edit', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
```

---

### 9. Update App Component

**src/app/app.component.ts**

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'employee-management-system';
}
```

---

### 10. Configure App Config

**src/app/app.config.ts**

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

---

### 11. Update Global Styles

**src/styles.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f6fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button {
  cursor: pointer;
  font-family: inherit;
}

input, select, textarea {
  font-family: inherit;
}

a {
  color: inherit;
}
```

---

## Running the Application

### Step 1: Start JSON Server

Open terminal and run:

```bash
json-server --watch db.json --port 3000
```

### Step 2: Start Angular Application

Open another terminal and run:

```bash
ng serve
```

Visit `http://localhost:4200` in your browser.

### Step 3: Login

Use credentials:
- Username: admin
- Password: admin123

---

## Key Angular Concepts Covered

### Components
- Standalone components
- Component lifecycle hooks (ngOnInit)
- Component communication
- Template syntax
- Event binding
- Property binding

### Services
- Dependency Injection
- HttpClient for API calls
- Observable and RxJS
- BehaviorSubject for state management

### Routing
- Route configuration
- Router navigation
- Route parameters
- Route guards (CanActivate)
- Query parameters

### Forms
- Template-driven forms (Login)
- Reactive forms (Employee Form)
- Form validation
- Custom validators
- Form controls

### Directives
- Structural directives (ngIf, ngFor)
- Attribute directives (ngClass, ngStyle)
- Custom directives (Highlight)

### Pipes
- Built-in pipes (date, currency)
- Custom pipes (SalaryFormat, Filter)
- Pipe transformation

### HTTP & Observables
- HttpClient methods (GET, POST, PUT, DELETE)
- Observable subscription
- RxJS operators (map)
- Error handling

### Guards
- Authentication guard
- Route protection

### Interceptors
- HTTP interceptors
- Request modification

### State Management
- Service-based state management
- BehaviorSubject
- Observable patterns

---

## Interview Preparation Points

### What is Angular?
Angular is a TypeScript-based framework for building single-page applications. It provides a complete solution with routing, forms, HTTP client, and more.

### Component Lifecycle
- ngOnInit: Called after component initialization
- ngOnDestroy: Called before component destruction
- ngOnChanges: Called when input properties change

### Services vs Components
- Components: Handle UI and user interaction
- Services: Handle business logic and data

### Dependency Injection
Angular's DI system provides dependencies to classes. Services are injected into components through constructors.

### Observables vs Promises
- Observables: Handle multiple values over time, lazy, cancellable
- Promises: Handle single value, eager, not cancellable

### Forms
- Template-driven: Simple, less code, suitable for basic forms
- Reactive: More control, complex validation, better for dynamic forms

### Guards
Guards protect routes based on conditions like authentication, permissions, or unsaved changes.

---

## Practice Exercises

### Exercise 1: Add Search by Department
Modify the employee list to filter employees by department using a dropdown.

### Exercise 2: Employee Statistics
Add a component that shows:
- Average salary per department
- Employee count per location
- Monthly joining trend

### Exercise 3: Bulk Operations
Add functionality to:
- Select multiple employees
- Delete selected employees
- Export selected employees to CSV

### Exercise 4: Advanced Validation
Add custom validators for:
- Email domain validation (only company domains)
- Salary range based on position
- Future date validation for date of joining

### Exercise 5: Real-time Search
Implement debouncing in search to avoid excessive API calls.

---

## Common Interview Questions

**Q1: What are standalone components?**
Standalone components don't need to be declared in NgModule. They are self-contained and import their own dependencies.

**Q2: Difference between OnPush and Default change detection?**
OnPush checks for changes only when input properties change or events occur. Default checks on every browser event.

**Q3: How does routing work in Angular?**
Angular Router maps URL paths to components and handles navigation, lazy loading, and guards.

**Q4: What is the purpose of RxJS?**
RxJS provides operators to work with asynchronous data streams using Observables.

**Q5: Explain HTTP Interceptors.**
Interceptors intercept HTTP requests/responses to add headers, handle errors, or modify requests globally.

**Q6: What are Signals in Angular?**
Signals are a new reactive primitive for managing state with fine-grained reactivity.

**Q7: How do you optimize Angular applications?**
- Lazy loading modules
- OnPush change detection
- TrackBy in ngFor
- Avoiding memory leaks
- Code splitting

---

## Quiz

**Question 1:** What decorator is used to create a service in Angular?
a) @Component
b) @Injectable
c) @Service
d) @Provider

**Answer:** b) @Injectable

**Question 2:** Which RxJS operator is used to transform observable values?
a) filter
b) map
c) subscribe
d) tap

**Answer:** b) map

**Question 3:** What is the purpose of CanActivate guard?
a) To prevent navigation
b) To protect routes
c) To validate forms
d) To handle errors

**Answer:** b) To protect routes

**Question 4:** In Reactive Forms, which class represents a single form control?
a) FormGroup
b) FormArray
c) FormControl
d) FormBuilder

**Answer:** c) FormControl

**Question 5:** What is the difference between ngOnInit and constructor?
a) No difference
b) ngOnInit runs after constructor and after inputs are set
c) Constructor runs after ngOnInit
d) ngOnInit is for services only

**Answer:** b) ngOnInit runs after constructor and after inputs are set

---

## Next Steps

After mastering this application, explore:

1. State Management (NgRx, Akita)
2. Advanced RxJS operators
3. Performance optimization
4. Testing (Unit tests, E2E tests)
5. Progressive Web Apps
6. Server-Side Rendering (SSR)
7. Micro-frontends
8. Angular Signals and modern features

---

## Conclusion

This Employee Management System covers all fundamental Angular concepts needed for interviews and real-world projects. Practice building similar applications with different domains like:

- Library Management System
- Hospital Management System
- Inventory Management System
- Student Management System

The more you practice, the better you'll understand Angular's architecture and patterns. Good luck with your learning journey!