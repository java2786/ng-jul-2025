# Angular v20 Cheat Sheet  
  
## Introduction  
  
Angular is a powerful TypeScript-based web application framework developed by Google. Version 20 brings improved performance, better developer experience, and enhanced features for building modern web applications.  
  
This cheat sheet is designed for beginners and freshers who want quick access to Angular syntax, concepts, and common patterns.  
  
---  
  
## Table of Contents  
  
1. [Installation & Setup](#installation--setup)  
2. [Project Structure](#project-structure)  
3. [Components](#components)  
4. [Templates & Data Binding](#templates--data-binding)  
5. [Directives](#directives)  
6. [Pipes](#pipes)  
7. [Services & Dependency Injection](#services--dependency-injection)  
8. [Routing](#routing)  
9. [Forms](#forms)  
10. [HTTP Client](#http-client)  
11. [Signals](#signals)  
12. [Lifecycle Hooks](#lifecycle-hooks)  
13. [Common CLI Commands](#common-cli-commands)  
  
---  
  
## Installation & Setup  
  
### Prerequisites  
  
```bash  
# Install Node.js (v18 or higher recommended)  
# Download from nodejs.org  
  
# Verify installation  
node --version  
npm --version  
```  
  
### Angular CLI Installation  
  
```bash  
# Install Angular CLI globally  
npm install -g @angular/cli  
  
# Check Angular CLI version  
ng version  
  
# Create new Angular project  
ng new indian-railways-booking  
  
# Navigate to project  
cd indian-railways-booking  
  
# Start development server  
ng serve  
  
# Open browser at http://localhost:4200  
```  
  
---  
  
## Project Structure  
  
```  
indian-railways-booking/  
├── node_modules/           # Dependencies  
├── src/  
│   ├── app/  
│   │   ├── app.component.ts       # Root component  
│   │   ├── app.component.html     # Root template  
│   │   ├── app.component.css      # Root styles  
│   │   ├── app.config.ts          # App configuration  
│   │   └── app.routes.ts          # Route definitions  
│   ├── assets/                     # Images, files  
│   ├── index.html                  # Main HTML  
│   ├── main.ts                     # App entry point  
│   └── styles.css                  # Global styles  
├── angular.json                    # Angular config  
├── package.json                    # Dependencies  
├── tsconfig.json                   # TypeScript config  
└── README.md  
```  
  
---  
  
## Components  
  
Components are the building blocks of Angular applications. Each component controls a portion of the screen (view).  
  
### Creating Components  
  
```bash  
# Generate component using CLI  
ng generate component train-list  
# Shorthand  
ng g c train-list  
  
# Generate component with options  
ng g c ticket-booking --skip-tests  
```  
  
### Component Structure (Standalone)  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-train-list',           // HTML tag name  
  standalone: true,                     // Standalone component (default in v20)  
  imports: [CommonModule],              // Import dependencies  
  templateUrl: './train-list.component.html',  
  styleUrl: './train-list.component.css'  
})  
export class TrainListComponent {  
  // Component class with properties and methods  
  trainName: string = 'Rajdhani Express';  
  trainNumber: string = '12301';  
    
  bookTicket(): void {  
    console.log('Ticket booked for ' + this.trainName);  
  }  
}  
```  
  
### Inline Template & Styles  
  
```typescript  
@Component({  
  selector: 'app-greeting',  
  standalone: true,  
  template: `  
    <h1>Welcome to LIC Portal</h1>  
    <p>Hello, {{ userName }}!</p>  
  `,  
  styles: [`  
    h1 { color: blue; }  
    p { font-size: 16px; }  
  `]  
})  
export class GreetingComponent {  
  userName: string = 'Suresh Kumar';  
}  
```  
  
---  
  
## Templates & Data Binding  
  
### Interpolation  
  
```html  
<!-- Display component properties -->  
<h1>{{ title }}</h1>  
<p>Employee Name: {{ employeeName }}</p>  
<p>Salary: {{ salary * 12 }}</p>  
<p>{{ getFullName() }}</p>  
```  
  
```typescript  
export class EmployeeComponent {  
  title = 'Employee Details';  
  employeeName = 'Ramesh Sharma';  
  salary = 50000;  
    
  getFullName(): string {  
    return 'Mr. ' + this.employeeName;  
  }  
}  
```  
  
### Property Binding  
  
```html  
<!-- Bind to HTML properties -->  
<img [src]="imageUrl" [alt]="imageDescription">  
<button [disabled]="isDisabled">Submit</button>  
<input [value]="userName" [readonly]="isReadOnly">  
  
<!-- Class binding -->  
<div [class.active]="isActive">Active Status</div>  
<div [class]="cssClasses">Multiple Classes</div>  
  
<!-- Style binding -->  
<p [style.color]="textColor">Colored Text</p>  
<p [style.font-size.px]="fontSize">Font Size</p>  
```  
  
```typescript  
export class ProductComponent {  
  imageUrl = 'assets/laptop.jpg';  
  imageDescription = 'Dell Laptop';  
  isDisabled = false;  
  userName = 'Mahesh';  
  isReadOnly = true;  
  isActive = true;  
  cssClasses = 'btn btn-primary';  
  textColor = 'red';  
  fontSize = 18;  
}  
```  
  
### Event Binding  
  
```html  
<!-- Handle user events -->  
<button (click)="handleClick()">Click Me</button>  
<input (input)="onInputChange($event)" placeholder="Type here">  
<form (submit)="onSubmit()">  
  <button type="submit">Submit Form</button>  
</form>  
  
<!-- Passing event object -->  
<button (click)="showDetails($event)">Show Details</button>  
```  
  
```typescript  
export class EventComponent {  
  handleClick(): void {  
    alert('Button clicked by Dinesh!');  
  }  
    
  onInputChange(event: Event): void {  
    const value = (event.target as HTMLInputElement).value;  
    console.log('Input value:', value);  
  }  
    
  onSubmit(): void {  
    console.log('Form submitted');  
  }  
    
  showDetails(event: MouseEvent): void {  
    console.log('Event:', event);  
  }  
}  
```  
  
### Two-Way Binding  
  
```html  
<!-- Using ngModel for two-way binding -->  
<input [(ngModel)]="customerName" placeholder="Enter name">  
<p>Hello, {{ customerName }}!</p>  
```  
  
```typescript  
import { Component } from '@angular/core';  
import { FormsModule } from '@angular/forms';  
  
@Component({  
  selector: 'app-customer',  
  standalone: true,  
  imports: [FormsModule],  // Import FormsModule  
  template: `  
    <input [(ngModel)]="customerName" placeholder="Enter name">  
    <p>Hello, {{ customerName }}!</p>  
  `  
})  
export class CustomerComponent {  
  customerName = 'Mukesh';  
}  
```  
  
---  
  
## Directives  
  
Directives are instructions in the DOM. Angular has three types: Component, Structural, and Attribute directives.  
  
### Structural Directives  
  
#### *ngIf - Conditional Rendering  
  
```html  
<!-- Show/hide elements -->  
<div *ngIf="isLoggedIn">  
  <h2>Welcome, {{ userName }}!</h2>  
</div>  
  
<div *ngIf="!isLoggedIn">  
  <p>Please log in to continue</p>  
</div>  
  
<!-- ngIf with else -->  
<div *ngIf="hasTicket; else noTicket">  
  <p>Your ticket is confirmed</p>  
</div>  
<ng-template #noTicket>  
  <p>No ticket booked yet</p>  
</ng-template>  
  
<!-- ngIf with then/else -->  
<div *ngIf="isPremiumUser; then premium; else regular"></div>  
<ng-template #premium>  
  <p>Premium Member Benefits</p>  
</ng-template>  
<ng-template #regular>  
  <p>Regular Member</p>  
</ng-template>  
```  
  
#### *ngFor - Loop Through Arrays  
  
```html  
<!-- Iterate over arrays -->  
<ul>  
  <li *ngFor="let city of cities">{{ city }}</li>  
</ul>  
  
<!-- Access index -->  
<ul>  
  <li *ngFor="let employee of employees; let i = index">  
    {{ i + 1 }}. {{ employee }}  
  </li>  
</ul>  
  
<!-- Track by for performance -->  
<div *ngFor="let product of products; trackBy: trackByProductId">  
  {{ product.name }} - Rs. {{ product.price }}  
</div>  
  
<!-- Additional variables -->  
<ul>  
  <li *ngFor="let item of items;   
              let i = index;   
              let isFirst = first;   
              let isLast = last;  
              let isEven = even;  
              let isOdd = odd">  
    {{ i }}. {{ item }}   
    <span *ngIf="isFirst">(First)</span>  
    <span *ngIf="isLast">(Last)</span>  
  </li>  
</ul>  
```  
  
```typescript  
export class CityComponent {  
  cities = ['Pune', 'Chennai', 'Mumbai', 'Bangalore', 'Delhi'];  
    
  employees = ['Kamlesh', 'Nitesh', 'Hitesh', 'Ratnesh'];  
    
  products = [  
    { id: 1, name: 'Laptop', price: 45000 },  
    { id: 2, name: 'Mouse', price: 500 },  
    { id: 3, name: 'Keyboard', price: 1500 }  
  ];  
    
  items = ['Item 1', 'Item 2', 'Item 3'];  
    
  trackByProductId(index: number, product: any): number {  
    return product.id;  
  }  
}  
```  
  
#### *ngSwitch - Multiple Conditions  
  
```html  
<div [ngSwitch]="userRole">  
  <p *ngSwitchCase="'admin'">Admin Dashboard</p>  
  <p *ngSwitchCase="'manager'">Manager Dashboard</p>  
  <p *ngSwitchCase="'employee'">Employee Dashboard</p>  
  <p *ngSwitchDefault>Guest View</p>  
</div>  
```  
  
### Attribute Directives  
  
#### ngClass - Dynamic Classes  
  
```html  
<!-- Single class -->  
<div [ngClass]="'active'">Active</div>  
  
<!-- Conditional class -->  
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">  
  Status  
</div>  
  
<!-- Array of classes -->  
<div [ngClass]="['btn', 'btn-primary', 'large']">Button</div>  
  
<!-- From component property -->  
<div [ngClass]="cssClasses">Dynamic Classes</div>  
```  
  
#### ngStyle - Dynamic Styles  
  
```html  
<!-- Single style -->  
<p [ngStyle]="{ 'color': 'red' }">Red Text</p>  
  
<!-- Multiple styles -->  
<div [ngStyle]="{   
  'color': textColor,   
  'font-size.px': fontSize,  
  'background-color': bgColor   
}">  
  Styled Content  
</div>  
  
<!-- From component property -->  
<div [ngStyle]="customStyles">Custom Styles</div>  
```  
  
```typescript  
export class StyleComponent {  
  textColor = 'blue';  
  fontSize = 20;  
  bgColor = '#f0f0f0';  
    
  customStyles = {  
    'border': '2px solid black',  
    'padding': '10px',  
    'margin': '5px'  
  };  
}  
```  
  
---  
  
## Pipes  
  
Pipes transform data in templates. Angular provides built-in pipes and you can create custom ones.  
  
### Built-in Pipes  
  
```html  
<!-- Uppercase / Lowercase -->  
<p>{{ 'ramesh sharma' | uppercase }}</p>  <!-- RAMESH SHARMA -->  
<p>{{ 'DINESH KUMAR' | lowercase }}</p>   <!-- dinesh kumar -->  
  
<!-- Titlecase -->  
<p>{{ 'welcome to flipkart' | titlecase }}</p>  <!-- Welcome To Flipkart -->  
  
<!-- Date Pipe -->  
<p>{{ today | date }}</p>                           <!-- Dec 27, 2024 -->  
<p>{{ today | date:'short' }}</p>                   <!-- 12/27/24, 3:30 PM -->  
<p>{{ today | date:'fullDate' }}</p>                <!-- Friday, December 27, 2024 -->  
<p>{{ today | date:'dd/MM/yyyy' }}</p>              <!-- 27/12/2024 -->  
<p>{{ today | date:'dd-MMM-yyyy HH:mm:ss' }}</p>    <!-- 27-Dec-2024 15:30:45 -->  
  
<!-- Currency Pipe -->  
<p>{{ 45000 | currency:'INR' }}</p>                 <!-- ₹45,000.00 -->  
<p>{{ 45000 | currency:'INR':'symbol':'1.0-0' }}</p> <!-- ₹45,000 -->  
<p>{{ 1500.50 | currency:'USD' }}</p>               <!-- $1,500.50 -->  
  
<!-- Number Pipe -->  
<p>{{ 3.14159 | number }}</p>                       <!-- 3.142 -->  
<p>{{ 3.14159 | number:'1.0-0' }}</p>               <!-- 3 -->  
<p>{{ 3.14159 | number:'1.2-4' }}</p>               <!-- 3.1416 -->  
  
<!-- Percent Pipe -->  
<p>{{ 0.85 | percent }}</p>                         <!-- 85% -->  
<p>{{ 0.8567 | percent:'1.2-2' }}</p>               <!-- 85.67% -->  
  
<!-- Slice Pipe -->  
<p>{{ 'Indian Railways' | slice:0:6 }}</p>          <!-- Indian -->  
<ul>  
  <li *ngFor="let city of cities | slice:0:3">{{ city }}</li>  
</ul>  
  
<!-- JSON Pipe (for debugging) -->  
<pre>{{ employee | json }}</pre>  
  
<!-- Chaining Pipes -->  
<p>{{ 'himesh reshammiya' | titlecase | slice:0:6 }}</p>  <!-- Himesh -->  
<p>{{ today | date:'fullDate' | uppercase }}</p>  
```  
  
```typescript  
export class PipeComponent {  
  today = new Date();  
  employee = {  
    name: 'Gukesh Patel',  
    salary: 75000,  
    department: 'IT'  
  };  
  cities = ['Pune', 'Chennai', 'Mumbai', 'Bangalore'];  
}  
```  
  
### Custom Pipe  
  
```bash  
# Generate custom pipe  
ng generate pipe reverse  
```  
  
```typescript  
import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
  name: 'reverse',  
  standalone: true  
})  
export class ReversePipe implements PipeTransform {  
  transform(value: string): string {  
    return value.split('').reverse().join('');  
  }  
}  
```  
  
```html  
<!-- Usage -->  
<p>{{ 'Jitesh' | reverse }}</p>  <!-- htsetiJ -->  
```  
  
---  
  
## Services & Dependency Injection  
  
Services are singleton objects that provide specific functionality across the application.  
  
### Creating a Service  
  
```bash  
# Generate service  
ng generate service employee  
# Shorthand  
ng g s employee  
```  
  
### Service Structure  
  
```typescript  
import { Injectable } from '@angular/core';  
  
@Injectable({  
  providedIn: 'root'  // Service available application-wide  
})  
export class EmployeeService {  
  private employees = [  
    { id: 1, name: 'Suresh Kumar', department: 'IT' },  
    { id: 2, name: 'Ramesh Patel', department: 'HR' },  
    { id: 3, name: 'Mahesh Singh', department: 'Finance' }  
  ];  
    
  getEmployees() {  
    return this.employees;  
  }  
    
  getEmployeeById(id: number) {  
    return this.employees.find(emp => emp.id === id);  
  }  
    
  addEmployee(employee: any) {  
    this.employees.push(employee);  
  }  
}  
```  
  
### Using Service in Component  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { EmployeeService } from './employee.service';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-employee-list',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>Employee List</h2>  
    <ul>  
      <li *ngFor="let emp of employees">  
        {{ emp.name }} - {{ emp.department }}  
      </li>  
    </ul>  
  `  
})  
export class EmployeeListComponent implements OnInit {  
  employees: any[] = [];  
    
  // Inject service through constructor  
  constructor(private employeeService: EmployeeService) {}  
    
  ngOnInit(): void {  
    this.employees = this.employeeService.getEmployees();  
  }  
}  
```  
  
---  
  
## Routing  
  
Routing enables navigation between different views/components.  
  
### Setting Up Routes  
  
```typescript  
// app.routes.ts  
import { Routes } from '@angular/router';  
import { HomeComponent } from './home/home.component';  
import { AboutComponent } from './about/about.component';  
import { ContactComponent } from './contact/contact.component';  
import { ProductListComponent } from './product-list/product-list.component';  
import { ProductDetailComponent } from './product-detail/product-detail.component';  
import { NotFoundComponent } from './not-found/not-found.component';  
  
export const routes: Routes = [  
  { path: '', component: HomeComponent },                    // Default route  
  { path: 'about', component: AboutComponent },  
  { path: 'contact', component: ContactComponent },  
  { path: 'products', component: ProductListComponent },  
  { path: 'products/:id', component: ProductDetailComponent }, // Route parameter  
  { path: '**', component: NotFoundComponent }               // Wildcard (404)  
];  
```  
  
```typescript  
// app.config.ts  
import { ApplicationConfig } from '@angular/core';  
import { provideRouter } from '@angular/router';  
import { routes } from './app.routes';  
  
export const appConfig: ApplicationConfig = {  
  providers: [provideRouter(routes)]  
};  
```  
  
### Router Outlet  
  
```html  
<!-- app.component.html -->  
<nav>  
  <a routerLink="/">Home</a>  
  <a routerLink="/about">About</a>  
  <a routerLink="/contact">Contact</a>  
  <a routerLink="/products">Products</a>  
</nav>  
  
<router-outlet></router-outlet>  
```  
  
### RouterLink & RouterLinkActive  
  
```html  
<nav>  
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">  
    Home  
  </a>  
  <a routerLink="/about" routerLinkActive="active">About</a>  
  <a routerLink="/products" routerLinkActive="active">Products</a>  
</nav>  
```  
  
```css  
/* Style for active link */  
.active {  
  font-weight: bold;  
  color: blue;  
  border-bottom: 2px solid blue;  
}  
```  
  
### Programmatic Navigation  
  
```typescript  
import { Component } from '@angular/core';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-login',  
  template: `  
    <button (click)="navigateToHome()">Go to Home</button>  
    <button (click)="navigateToProduct(123)">View Product 123</button>  
  `  
})  
export class LoginComponent {  
  constructor(private router: Router) {}  
    
  navigateToHome(): void {  
    this.router.navigate(['/']);  
  }  
    
  navigateToProduct(id: number): void {  
    this.router.navigate(['/products', id]);  
  }  
    
  navigateWithQueryParams(): void {  
    this.router.navigate(['/products'], {   
      queryParams: { category: 'electronics', sort: 'price' }   
    });  
    // URL: /products?category=electronics&sort=price  
  }  
}  
```  
  
### Reading Route Parameters  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';  
  
@Component({  
  selector: 'app-product-detail',  
  template: `  
    <h2>Product Details</h2>  
    <p>Product ID: {{ productId }}</p>  
  `  
})  
export class ProductDetailComponent implements OnInit {  
  productId: string | null = null;  
    
  constructor(private route: ActivatedRoute) {}  
    
  ngOnInit(): void {  
    // Read route parameter  
    this.productId = this.route.snapshot.paramMap.get('id');  
      
    // Or subscribe for dynamic updates  
    this.route.paramMap.subscribe(params => {  
      this.productId = params.get('id');  
    });  
      
    // Read query parameters  
    this.route.queryParamMap.subscribe(queryParams => {  
      const category = queryParams.get('category');  
      const sort = queryParams.get('sort');  
    });  
  }  
}  
```  
  
---  
  
## Forms  
  
Angular provides two approaches to handle forms: Template-driven and Reactive forms.  
  
### Template-Driven Forms  
  
```typescript  
import { Component } from '@angular/core';  
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-registration',  
  standalone: true,  
  imports: [FormsModule, CommonModule],  
  templateUrl: './registration.component.html'  
})  
export class RegistrationComponent {  
  user = {  
    name: '',  
    email: '',  
    phone: '',  
    city: ''  
  };  
    
  cities = ['Pune', 'Chennai', 'Mumbai', 'Bangalore', 'Delhi'];  
    
  onSubmit(): void {  
    console.log('Form submitted:', this.user);  
    alert('Registration successful for ' + this.user.name);  
  }  
}  
```  
  
```html  
<!-- registration.component.html -->  
<form #registrationForm="ngForm" (ngSubmit)="onSubmit()">  
  <div>  
    <label>Name:</label>  
    <input type="text"   
           name="name"   
           [(ngModel)]="user.name"   
           required   
           minlength="3"  
           #name="ngModel">  
    <div *ngIf="name.invalid && name.touched">  
      <p *ngIf="name.errors?.['required']">Name is required</p>  
      <p *ngIf="name.errors?.['minlength']">Name must be at least 3 characters</p>  
    </div>  
  </div>  
    
  <div>  
    <label>Email:</label>  
    <input type="email"   
           name="email"   
           [(ngModel)]="user.email"   
           required   
           email  
           #email="ngModel">  
    <div *ngIf="email.invalid && email.touched">  
      <p *ngIf="email.errors?.['required']">Email is required</p>  
      <p *ngIf="email.errors?.['email']">Invalid email format</p>  
    </div>  
  </div>  
    
  <div>  
    <label>Phone:</label>  
    <input type="tel"   
           name="phone"   
           [(ngModel)]="user.phone"   
           required   
           pattern="[0-9]{10}"  
           #phone="ngModel">  
    <div *ngIf="phone.invalid && phone.touched">  
      <p *ngIf="phone.errors?.['required']">Phone is required</p>  
      <p *ngIf="phone.errors?.['pattern']">Phone must be 10 digits</p>  
    </div>  
  </div>  
    
  <div>  
    <label>City:</label>  
    <select name="city" [(ngModel)]="user.city" required>  
      <option value="">Select City</option>  
      <option *ngFor="let city of cities" [value]="city">{{ city }}</option>  
    </select>  
  </div>  
    
  <button type="submit" [disabled]="registrationForm.invalid">Register</button>  
</form>  
  
<div *ngIf="registrationForm.valid">  
  <h3>Form Preview:</h3>  
  <pre>{{ user | json }}</pre>  
</div>  
```  
  
### Reactive Forms  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-employee-form',  
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './employee-form.component.html'  
})  
export class EmployeeFormComponent implements OnInit {  
  employeeForm!: FormGroup;  
    
  constructor(private fb: FormBuilder) {}  
    
  ngOnInit(): void {  
    this.employeeForm = this.fb.group({  
      name: ['', [Validators.required, Validators.minLength(3)]],  
      email: ['', [Validators.required, Validators.email]],  
      salary: ['', [Validators.required, Validators.min(10000)]],  
      department: ['', Validators.required]  
    });  
  }  
    
  onSubmit(): void {  
    if (this.employeeForm.valid) {  
      console.log('Form Data:', this.employeeForm.value);  
      alert('Employee added successfully!');  
      this.employeeForm.reset();  
    }  
  }  
    
  // Getter methods for easy access in template  
  get name() { return this.employeeForm.get('name'); }  
  get email() { return this.employeeForm.get('email'); }  
  get salary() { return this.employeeForm.get('salary'); }  
  get department() { return this.employeeForm.get('department'); }  
}  
```  
  
```html  
<!-- employee-form.component.html -->  
<form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">  
  <div>  
    <label>Name:</label>  
    <input type="text" formControlName="name">  
    <div *ngIf="name?.invalid && name?.touched">  
      <p *ngIf="name?.errors?.['required']">Name is required</p>  
      <p *ngIf="name?.errors?.['minlength']">Name must be at least 3 characters</p>  
    </div>  
  </div>  
    
  <div>  
    <label>Email:</label>  
    <input type="email" formControlName="email">  
    <div *ngIf="email?.invalid && email?.touched">  
      <p *ngIf="email?.errors?.['required']">Email is required</p>  
      <p *ngIf="email?.errors?.['email']">Invalid email</p>  
    </div>  
  </div>  
    
  <div>  
    <label>Salary:</label>  
    <input type="number" formControlName="salary">  
    <div *ngIf="salary?.invalid && salary?.touched">  
      <p *ngIf="salary?.errors?.['required']">Salary is required</p>  
      <p *ngIf="salary?.errors?.['min']">Minimum salary is ₹10,000</p>  
    </div>  
  </div>  
    
  <div>  
    <label>Department:</label>  
    <select formControlName="department">  
      <option value="">Select Department</option>  
      <option value="IT">IT</option>  
      <option value="HR">HR</option>  
      <option value="Finance">Finance</option>  
    </select>  
  </div>  
    
  <button type="submit" [disabled]="employeeForm.invalid">Add Employee</button>  
</form>  
```  
  
---  
  
## HTTP Client  
  
The HTTP Client module is used to communicate with backend APIs.  
  
### Setup  
  
```typescript  
// app.config.ts  
import { ApplicationConfig } from '@angular/core';  
import { provideHttpClient } from '@angular/common/http';  
  
export const appConfig: ApplicationConfig = {  
  providers: [provideHttpClient()]  
};  
```  
  
### HTTP Service  
  
```typescript  
import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
  
export interface Product {  
  id: number;  
  name: string;  
  price: number;  
  category: string;  
}  
  
@Injectable({  
  providedIn: 'root'  
})  
export class ProductService {  
  private apiUrl = 'https://api.example.com/products';  
    
  constructor(private http: HttpClient) {}  
    
  // GET - Fetch all products  
  getProducts(): Observable<Product[]> {  
    return this.http.get<Product[]>(this.apiUrl);  
  }  
    
  // GET - Fetch single product  
  getProductById(id: number): Observable<Product> {  
    return this.http.get<Product>(`${this.apiUrl}/${id}`);  
  }  
    
  // POST - Create product  
  addProduct(product: Product): Observable<Product> {  
    return this.http.post<Product>(this.apiUrl, product);  
  }  
    
  // PUT - Update product  
  updateProduct(id: number, product: Product): Observable<Product> {  
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);  
  }  
    
  // DELETE - Remove product  
  deleteProduct(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }  
    
  // GET with query parameters  
  searchProducts(searchTerm: string): Observable<Product[]> {  
    return this.http.get<Product[]>(`${this.apiUrl}?search=${searchTerm}`);  
  }  
    
  // GET with headers  
  getProductsWithAuth(): Observable<Product[]> {  
    const headers = new HttpHeaders({  
      'Authorization': 'Bearer your-token-here',  
      'Content-Type': 'application/json'  
    });  
    return this.http.get<Product[]>(this.apiUrl, { headers });  
  }  
}  
```  
  
### Using HTTP Service in Component  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { ProductService, Product } from './product.service';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-product-list',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>Flipkart Products</h2>  
      
    <div *ngIf="loading">Loading products...</div>  
    <div *ngIf="error">Error: {{ error }}</div>  
      
    <ul *ngIf="!loading && !error">  
      <li *ngFor="let product of products">  
        {{ product.name }} - ₹{{ product.price }}  
        <button (click)="deleteProduct(product.id)">Delete</button>  
      </li>  
    </ul>  
      
    <button (click)="addNewProduct()">Add Product</button>  
  `  
})  
export class ProductListComponent implements OnInit {  
  products: Product[] = [];  
  loading = false;  
  error: string | null = null;  
    
  constructor(private productService: ProductService) {}  
    
  ngOnInit(): void {  
    this.loadProducts();  
  }  
    
  loadProducts(): void {  
    this.loading = true;  
    this.productService.getProducts().subscribe({  
      next: (data) => {  
        this.products = data;  
        this.loading = false;  
      },  
      error: (err) => {  
        this.error = 'Failed to load products';  
        this.loading = false;  
        console.error('Error:', err);  
      },  
      complete: () => {  
        console.log('Products loaded successfully');  
      }  
    });  
  }  
    
  addNewProduct(): void {  
    const newProduct: Product = {  
      id: 0,  
      name: 'New Laptop',  
      price: 45000,  
      category: 'Electronics'  
    };  
      
    this.productService.addProduct(newProduct).subscribe({  
      next: (product) => {  
        this.products.push(product);  
        alert('Product added successfully!');  
      },  
      error: (err) => console.error('Error adding product:', err)  
    });  
  }  
    
  deleteProduct(id: number): void {  
    this.productService.deleteProduct(id).subscribe({  
      next: () => {  
        this.products = this.products.filter(p => p.id !== id);  
        alert('Product deleted successfully!');  
      },  
      error: (err) => console.error('Error deleting product:', err)  
    });  
  }  
}  
```  
  
---  
  
## Signals  
  
Signals are a new reactive primitive introduced in Angular v16+ for fine-grained reactivity.  
  
### Creating Signals  
  
```typescript  
import { Component, signal, computed, effect } from '@angular/core';  
  
@Component({  
  selector: 'app-counter',  
  standalone: true,  
  template: `  
    <h2>Counter: {{ count() }}</h2>  
    <h3>Double: {{ doubleCount() }}</h3>  
    <button (click)="increment()">Increment</button>  
    <button (click)="decrement()">Decrement</button>  
    <button (click)="reset()">Reset</button>  
  `  
})  
export class CounterComponent {  
  // Writable signal  
  count = signal(0);  
    
  // Computed signal (derived value)  
  doubleCount = computed(() => this.count() * 2);  
    
  // Effect (side effect when signal changes)  
  constructor() {  
    effect(() => {  
      console.log('Count changed to:', this.count());  
    });  
  }  
    
  increment(): void {  
    this.count.update(value => value + 1);  
  }  
    
  decrement(): void {  
    this.count.update(value => value - 1);  
  }  
    
  reset(): void {  
    this.count.set(0);  
  }  
}  
```  
  
### Signal with Objects  
  
```typescript  
import { Component, signal } from '@angular/core';  
  
interface Employee {  
  name: string;  
  salary: number;  
  department: string;  
}  
  
@Component({  
  selector: 'app-employee',  
  standalone: true,  
  template: `  
    <h2>Employee: {{ employee().name }}</h2>  
    <p>Salary: ₹{{ employee().salary }}</p>  
    <p>Department: {{ employee().department }}</p>  
    <button (click)="increaseSalary()">Increase Salary</button>  
  `  
})  
export class EmployeeComponent {  
  employee = signal<Employee>({  
    name: 'Suresh Kumar',  
    salary: 50000,  
    department: 'IT'  
  });  
    
  increaseSalary(): void {  
    this.employee.update(emp => ({  
      ...emp,  
      salary: emp.salary + 5000  
    }));  
  }  
}  
```  
  
---  
  
## Lifecycle Hooks  
  
Angular components have lifecycle hooks that allow you to tap into key moments.  
  
```typescript  
import { Component, OnInit, OnDestroy, OnChanges,   
         AfterViewInit, SimpleChanges } from '@angular/core';  
  
@Component({  
  selector: 'app-lifecycle',  
  standalone: true,  
  template: `<p>Lifecycle Demo Component</p>`  
})  
export class LifecycleComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {  
    
  // Called once when component is initialized  
  ngOnInit(): void {  
    console.log('ngOnInit: Component initialized');  
    // Fetch data, set up subscriptions  
  }  
    
  // Called when input properties change  
  ngOnChanges(changes: SimpleChanges): void {  
    console.log('ngOnChanges: Input properties changed', changes);  
  }  
    
  // Called after view is initialized  
  ngAfterViewInit(): void {  
    console.log('ngAfterViewInit: View initialized');  
    // Access child components, DOM elements  
  }  
    
  // Called before component is destroyed  
  ngOnDestroy(): void {  
    console.log('ngOnDestroy: Component destroyed');  
    // Clean up subscriptions, timers  
  }  
}  
```  
  
### Common Lifecycle Hooks  
  
| Hook | Purpose | Use Case |  
|------|---------|----------|  
| `ngOnInit()` | Initialize component | Fetch data, setup |  
| `ngOnChanges()` | React to input changes | Update based on @Input |  
| `ngAfterViewInit()` | After view ready | Access DOM, child components |  
| `ngOnDestroy()` | Before component destroyed | Cleanup, unsubscribe |  
  
---  
  
## Common CLI Commands  
  
### Project Commands  
  
```bash  
# Create new project  
ng new my-app  
ng new my-app --routing           # With routing  
ng new my-app --standalone false  # With NgModules  
  
# Serve application  
ng serve  
ng serve --port 4300              # Custom port  
ng serve --open                   # Auto open browser  
ng serve -o                       # Shorthand for --open  
  
# Build for production  
ng build  
ng build --configuration production  
```  
  
### Generate Commands  
  
```bash  
# Component  
ng generate component train-booking  
ng g c train-booking  
ng g c train-booking --skip-tests  
  
# Service  
ng generate service api/employee  
ng g s api/employee  
  
# Pipe  
ng generate pipe custom-filter  
ng g pipe custom-filter  
  
# Directive  
ng generate directive highlight  
ng g d highlight  
  
# Guard  
ng generate guard auth  
ng g g auth  
  
# Module (if using NgModules)  
ng generate module products --routing  
ng g m products --routing  
```  
  
### Other Commands  
  
```bash  
# Run tests  
ng test  
  
# Run end-to-end tests  
ng e2e  
  
# Lint code  
ng lint  
  
# Update Angular  
ng update @angular/cli @angular/core  
  
# Add dependencies  
ng add @angular/material  
ng add @angular/pwa  
  
# Check version  
ng version  
```  
  
---  
  
## Quick Reference Examples  
  
### Real-World Scenario: LIC Policy Management  
  
```typescript  
// policy.model.ts  
export interface Policy {  
  policyNumber: string;  
  holderName: string;  
  premiumAmount: number;  
  maturityDate: Date;  
  status: 'Active' | 'Lapsed' | 'Matured';  
}  
  
// policy.service.ts  
import { Injectable } from '@angular/core';  
import { signal } from '@angular/core';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class PolicyService {  
  policies = signal<Policy[]>([  
    {  
      policyNumber: 'LIC123456',  
      holderName: 'Ratnesh Sharma',  
      premiumAmount: 15000,  
      maturityDate: new Date('2035-12-31'),  
      status: 'Active'  
    },  
    {  
      policyNumber: 'LIC789012',  
      holderName: 'Himesh Kumar',  
      premiumAmount: 25000,  
      maturityDate: new Date('2040-06-30'),  
      status: 'Active'  
    }  
  ]);  
    
  addPolicy(policy: Policy): void {  
    this.policies.update(policies => [...policies, policy]);  
  }  
    
  getPolicyByNumber(policyNumber: string): Policy | undefined {  
    return this.policies().find(p => p.policyNumber === policyNumber);  
  }  
}  
  
// policy-list.component.ts  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { PolicyService } from './policy.service';  
  
@Component({  
  selector: 'app-policy-list',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>LIC Policy Dashboard</h2>  
    <table>  
      <thead>  
        <tr>  
          <th>Policy Number</th>  
          <th>Holder Name</th>  
          <th>Premium</th>  
          <th>Maturity Date</th>  
          <th>Status</th>  
        </tr>  
      </thead>  
      <tbody>  
        <tr *ngFor="let policy of policyService.policies()">  
          <td>{{ policy.policyNumber }}</td>  
          <td>{{ policy.holderName }}</td>  
          <td>{{ policy.premiumAmount | currency:'INR':'symbol':'1.0-0' }}</td>  
          <td>{{ policy.maturityDate | date:'dd/MM/yyyy' }}</td>  
          <td [ngClass]="{'active': policy.status === 'Active'}">  
            {{ policy.status }}  
          </td>  
        </tr>  
      </tbody>  
    </table>  
  `,  
  styles: [`  
    table { width: 100%; border-collapse: collapse; }  
    th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }  
    th { background-color: #f0f0f0; }  
    .active { color: green; font-weight: bold; }  
  `]  
})  
export class PolicyListComponent {  
  constructor(public policyService: PolicyService) {}  
}  
```  
  
---  
  
## Practice Quiz  
  
### Question 1  
What is the purpose of the `@Component` decorator in Angular?  
  
A) To define a service    
B) To define a component with metadata    
C) To define a module    
D) To define a directive    
  
**Answer:** B  
  
---  
  
### Question 2  
Which directive is used to iterate over a list in Angular templates?  
  
A) *ngIf    
B) *ngFor    
C) *ngSwitch    
D) *ngModel    
  
**Answer:** B  
  
---  
  
### Question 3  
What does the following code do? `[(ngModel)]="userName"`  
  
A) One-way data binding    
B) Two-way data binding    
C) Event binding    
D) Property binding    
  
**Answer:** B  
  
---  
  
### Question 4  
Which Angular module is required to use HTTP client?  
  
A) FormsModule    
B) RouterModule    
C) HttpClientModule    
D) BrowserModule    
  
**Answer:** C (Note: In v20, you use `provideHttpClient()` function)  
  
---  
  
### Question 5  
What is a Signal in Angular?  
  
A) A service    
B) A reactive primitive for state management    
C) A routing mechanism    
D) A form validator    
  
**Answer:** B  
  
---  
  
## Mini Assignments  
  
### Assignment 1: Student Management System  
Create a simple student management application with the following features:  
- Display list of students (name, roll number, marks)  
- Add new student using a form  
- Calculate and display average marks  
- Filter students by pass/fail status (passing marks: 40)  
  
**Indian Context Data:**  
```  
Students: Gukesh (Roll: 101, Marks: 85), Jitesh (Roll: 102, Marks: 72),   
          Kamlesh (Roll: 103, Marks: 38), Nitesh (Roll: 104, Marks: 91)  
```  
  
---  
  
### Assignment 2: Railway Ticket Booking  
Build a railway ticket booking interface:  
- Show list of trains from Pune to Chennai  
- Display train details (name, number, departure time, fare)  
- Implement booking form (passenger name, age, seat preference)  
- Calculate total fare based on number of passengers  
- Show booking confirmation  
  
**Train Data:**  
```  
Trains:   
1. Chennai Express (12163, Departure: 08:15, Fare: ₹850)  
2. Shatabdi Express (12008, Departure: 11:30, Fare: ₹1200)  
3. Duronto Express (12296, Departure: 21:45, Fare: ₹950)  
```  
  
---  
  
### Assignment 3: Product Inventory with API  
Create a product inventory management system:  
- Use HttpClient to fetch products from an API  
- Display products in a table format  
- Implement add, update, and delete functionality  
- Add search/filter by product name or category  
- Show loading spinner while fetching data  
  
**API Endpoint:** Use JSONPlaceholder or create mock data  
  
---  
  
### Assignment 4: Employee Salary Calculator  
Build an employee salary calculator:  
- Create form to input employee details (name, basic salary, years of experience)  
- Calculate HRA (40% of basic), DA (20% of basic), PF (12% of basic)  
- Add experience bonus (₹2000 per year)  
- Display gross salary and net salary (after PF deduction)  
- Use Reactive Forms with validation  
- Display results using pipes for currency formatting  
  
---  
  
### Assignment 5: Multi-Page Application  
Create a multi-page application with routing:  
- Home page with welcome message  
- About page with company information  
- Products page showing list of products  
- Product detail page (when clicking on a product)  
- Contact page with a contact form  
- Implement navigation menu with active link highlighting  
  
**Companies:** Flipkart, LIC, Indian Railways  
  
---  
  
## Additional Resources  
  
### Official Documentation  
- Angular Official Docs: https://angular.dev  
- Angular CLI: https://angular.dev/cli  
- Angular Material: https://material.angular.io  
  
### Learning Path for Beginners  
1. Understand TypeScript basics  
2. Learn component creation and templates  
3. Master data binding and directives  
4. Practice with forms (template-driven first)  
5. Understand services and dependency injection  
6. Learn routing and navigation  
7. Work with HTTP and APIs  
8. Explore advanced topics (Signals, RxJS, State Management)  
  
---  
  
## Summary  
  
This cheat sheet covers essential Angular v20 concepts for beginners:  
  
- **Components**: Building blocks of Angular apps  
- **Templates**: HTML with Angular syntax for dynamic content  
- **Data Binding**: Connecting component data to templates  
- **Directives**: Instructions for DOM manipulation  
- **Pipes**: Transform data in templates  
- **Services**: Reusable business logic  
- **Routing**: Navigation between views  
- **Forms**: User input handling (Template-driven & Reactive)  
- **HTTP**: Communication with backend APIs  
- **Signals**: Modern reactive state management  
  
**Key Takeaways:**  
- Angular v20 uses standalone components by default (simpler architecture)  
- Always use Angular CLI for generating components, services, etc.  
- Follow best practices: use services for business logic, keep components lightweight  
- Leverage TypeScript for type safety and better development experience  
- Practice with real-world scenarios to solidify understanding  
  
**Next Steps:**  
- Build small projects using these concepts  
- Explore Angular Material for UI components  
- Learn RxJS for advanced reactive programming  
- Practice, practice, practice!  
  
---  
  
**Happy Learning!**  
  
---  
  
**Document Version:** 1.0    
**Last Updated:** December 2024    
**Target Audience:** Beginners and Freshers    
**Technology:** Angular v20