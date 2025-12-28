# Expense Tracker - Phase 4: Expense Management  
  
## Introduction  
  
In this phase, you'll build the complete expense management system. We'll create the expense list and add form together. You'll implement edit and delete functionality on your own to reinforce CRUD operations.  
  
---  
  
## What You'll Learn  
  
- Building data tables  
- Creating forms with validation  
- Implementing CRUD operations  
- Filtering and sorting data  
- Working with dates in forms  
  
---  
  
## Step 4.1: Complete Expense Service  
  
Open `src/app/services/expense.service.ts` and add:  
  
```typescript  
// Update expense  
updateExpense(id: number, expense: Expense): Observable<Expense> {  
  return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);  
}  
  
// Delete expense  
deleteExpense(id: number): Observable<void> {  
  return this.http.delete<void>(`${this.apiUrl}/${id}`);  
}  
  
// Get expenses by category  
getExpensesByCategory(userId: number, category: string): Observable<Expense[]> {  
  return this.http.get<Expense[]>(`${this.apiUrl}?userId=${userId}&category=${category}`);  
}  
  
// TODO: Implement method to get expenses by date range  
// getExpensesByDateRange(userId: number, startDate: string, endDate: string)  
// Hint: You'll need to filter on the client side as json-server   
// doesn't support range queries easily  
```  
  
---  
  
## Step 4.2: Create Expense List Component  
  
Generate component:  
```bash  
ng generate component components/expense-list  
```  
  
Open `src/app/components/expense-list/expense-list.ts`:  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
import { ExpenseService } from '../../services/expense.service';  
import { AuthService } from '../../services/auth.service';  
import { UtilityService } from '../../services/utility.service';  
import { Expense } from '../../models/expense.model';  
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../constants/app.constants';  
  
@Component({  
  selector: 'app-expense-list',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './expense-list.html',  
  styleUrl: './expense-list.css'  
})  
export class ExpenseListComponent implements OnInit {  
  expenses: Expense[] = [];  
  filteredExpenses: Expense[] = [];  
    
  // Filter options  
  categories = EXPENSE_CATEGORIES;  
  paymentMethods = PAYMENT_METHODS;  
    
  // Filter values  
  selectedCategory: string = '';  
  selectedPaymentMethod: string = '';  
  searchTerm: string = '';  
    
  isLoading: boolean = true;  
  
  constructor(  
    private expenseService: ExpenseService,  
    private authService: AuthService,  
    private utilityService: UtilityService,  
    private router: Router  
  ) { }  
  
  ngOnInit(): void {  
    this.loadExpenses();  
  }  
  
  loadExpenses(): void {  
    const userId = this.authService.getUserId();  
    this.isLoading = true;  
      
    this.expenseService.getUserExpenses(userId).subscribe({  
      next: (data) => {  
        this.expenses = data.sort((a, b) =>   
          new Date(b.date).getTime() - new Date(a.date).getTime()  
        );  
        this.filteredExpenses = this.expenses;  
        this.isLoading = false;  
      },  
      error: (error) => {  
        console.error('Error:', error);  
        this.isLoading = false;  
      }  
    });  
  }  
  
  applyFilters(): void {  
    this.filteredExpenses = this.expenses.filter(expense => {  
      const matchesCategory = !this.selectedCategory ||   
        expense.category === this.selectedCategory;  
        
      const matchesPayment = !this.selectedPaymentMethod ||   
        expense.paymentMethod === this.selectedPaymentMethod;  
        
      const matchesSearch = !this.searchTerm ||   
        expense.description.toLowerCase().includes(this.searchTerm.toLowerCase());  
        
      return matchesCategory && matchesPayment && matchesSearch;  
    });  
  }  
  
  clearFilters(): void {  
    this.selectedCategory = '';  
    this.selectedPaymentMethod = '';  
    this.searchTerm = '';  
    this.filteredExpenses = this.expenses;  
  }  
  
  formatCurrency(amount: number): string {  
    return this.utilityService.formatCurrency(amount);  
  }  
  
  formatDate(dateString: string): string {  
    return this.utilityService.formatDate(dateString);  
  }  
  
  addExpense(): void {  
    this.router.navigate(['/expenses/add']);  
  }  
  
  // TODO: Implement editExpense method  
  // Should navigate to edit page with expense ID  
  
  // TODO: Implement deleteExpense method  
  // Should confirm, then call service, then reload  
}  
```  
  
---  
  
## Step 4.3: Expense List Template  
  
Open `src/app/components/expense-list/expense-list.html`:  
  
```html  
<div class="expense-list-container">  
  <!-- Header -->  
  <div class="list-header">  
    <h2>All Expenses</h2>  
    <button class="btn btn-primary" (click)="addExpense()">  
      + Add Expense  
    </button>  
  </div>  
  
  <!-- Filters -->  
  <div class="filters-section card">  
    <div class="filter-row">  
      <input  
        type="text"  
        class="form-control"  
        [(ngModel)]="searchTerm"  
        (input)="applyFilters()"  
        placeholder="Search by description..."  
      />  
  
      <select   
        class="form-control"   
        [(ngModel)]="selectedCategory"  
        (change)="applyFilters()"  
      >  
        <option value="">All Categories</option>  
        <option *ngFor="let cat of categories" [value]="cat">  
          {{ cat }}  
        </option>  
      </select>  
  
      <select   
        class="form-control"   
        [(ngModel)]="selectedPaymentMethod"  
        (change)="applyFilters()"  
      >  
        <option value="">All Payment Methods</option>  
        <option *ngFor="let method of paymentMethods" [value]="method">  
          {{ method }}  
        </option>  
      </select>  
  
      <button class="btn btn-secondary" (click)="clearFilters()">  
        Clear  
      </button>  
    </div>  
  </div>  
  
  <!-- Loading -->  
  <div class="loading" *ngIf="isLoading">  
    <p>Loading expenses...</p>  
  </div>  
  
  <!-- Expense Table -->  
  <div class="expense-table card" *ngIf="!isLoading">  
    <table>  
      <thead>  
        <tr>  
          <th>Date</th>  
          <th>Category</th>  
          <th>Description</th>  
          <th>Payment Method</th>  
          <th>Amount</th>  
          <th>Actions</th>  
        </tr>  
      </thead>  
      <tbody>  
        <tr *ngFor="let expense of filteredExpenses">  
          <td>{{ formatDate(expense.date) }}</td>  
          <td>  
            <span class="category-badge">{{ expense.category }}</span>  
          </td>  
          <td>{{ expense.description }}</td>  
          <td>{{ expense.paymentMethod }}</td>  
          <td class="amount">{{ formatCurrency(expense.amount) }}</td>  
          <td class="actions">  
            <button class="btn-icon btn-edit" title="Edit">  
              ✏️  
            </button>  
            <button class="btn-icon btn-delete" title="Delete">  
              🗑️  
            </button>  
          </td>  
        </tr>  
      </tbody>  
    </table>  
  
    <div class="no-data" *ngIf="filteredExpenses.length === 0">  
      <p>No expenses found</p>  
    </div>  
  </div>  
</div>  
```  
  
---  
  
## Step 4.4: Expense List Styles  
  
Open `src/app/components/expense-list/expense-list.css`:  
  
```css  
.expense-list-container {  
  max-width: 1200px;  
  margin: 0 auto;  
}  
  
.list-header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 20px;  
}  
  
.filters-section {  
  margin-bottom: 20px;  
}  
  
.filter-row {  
  display: grid;  
  grid-template-columns: 2fr 1fr 1fr auto;  
  gap: 15px;  
}  
  
/* Table Styles */  
.expense-table table {  
  width: 100%;  
  border-collapse: collapse;  
}  
  
.expense-table th {  
  background: #f8f9fa;  
  padding: 12px;  
  text-align: left;  
  font-weight: 600;  
  color: #2c3e50;  
}  
  
.expense-table td {  
  padding: 12px;  
  border-bottom: 1px solid #ecf0f1;  
}  
  
.category-badge {  
  background: #4caf50;  
  color: white;  
  padding: 4px 12px;  
  border-radius: 12px;  
  font-size: 13px;  
}  
  
.amount {  
  font-weight: 600;  
  color: #e74c3c;  
}  
  
.actions {  
  display: flex;  
  gap: 8px;  
}  
  
.btn-icon {  
  background: none;  
  border: none;  
  font-size: 18px;  
  cursor: pointer;  
  padding: 4px;  
}  
  
.btn-icon:hover {  
  transform: scale(1.2);  
}  
  
.no-data {  
  text-align: center;  
  padding: 40px;  
  color: #7f8c8d;  
}  
  
@media (max-width: 768px) {  
  .filter-row {  
    grid-template-columns: 1fr;  
  }  
  
  .expense-table {  
    overflow-x: auto;  
  }  
}  
```  
  
---  
  
## Step 4.5: Create Add Expense Component  
  
Generate component:  
```bash  
ng generate component components/add-expense  
```  
  
Open `src/app/components/add-expense/add-expense.ts`:  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
import { ExpenseService } from '../../services/expense.service';  
import { AuthService } from '../../services/auth.service';  
import { Expense } from '../../models/expense.model';  
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../constants/app.constants';  
  
@Component({  
  selector: 'app-add-expense',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './add-expense.html',  
  styleUrl: './add-expense.css'  
})  
export class AddExpenseComponent {  
  expense: Expense = {  
    id: 0,  
    userId: 0,  
    amount: 0,  
    category: '',  
    description: '',  
    date: '',  
    paymentMethod: '',  
    createdAt: ''  
  };  
  
  categories = EXPENSE_CATEGORIES;  
  paymentMethods = PAYMENT_METHODS;  
    
  errorMessage: string = '';  
  isSubmitting: boolean = false;  
  
  constructor(  
    private expenseService: ExpenseService,  
    private authService: AuthService,  
    private router: Router  
  ) {  
    // Set default values  
    this.expense.userId = this.authService.getUserId();  
    this.expense.date = this.getTodayDate();  
  }  
  
  getTodayDate(): string {  
    return new Date().toISOString().split('T')[0];  
  }  
  
  validateForm(): boolean {  
    if (!this.expense.amount || this.expense.amount <= 0) {  
      this.errorMessage = 'Please enter a valid amount';  
      return false;  
    }  
  
    if (!this.expense.category) {  
      this.errorMessage = 'Please select a category';  
      return false;  
    }  
  
    if (!this.expense.description || this.expense.description.trim().length < 3) {  
      this.errorMessage = 'Please enter a description (min 3 characters)';  
      return false;  
    }  
  
    if (!this.expense.date) {  
      this.errorMessage = 'Please select a date';  
      return false;  
    }  
  
    if (!this.expense.paymentMethod) {  
      this.errorMessage = 'Please select a payment method';  
      return false;  
    }  
  
    return true;  
  }  
  
  onSubmit(): void {  
    if (!this.validateForm()) {  
      return;  
    }  
  
    this.isSubmitting = true;  
    this.expense.createdAt = new Date().toISOString();  
  
    this.expenseService.createExpense(this.expense).subscribe({  
      next: () => {  
        this.router.navigate(['/expenses']);  
      },  
      error: (error) => {  
        this.errorMessage = 'Failed to add expense. Please try again.';  
        this.isSubmitting = false;  
      }  
    });  
  }  
  
  cancel(): void {  
    this.router.navigate(['/expenses']);  
  }  
}  
```  
  
---  
  
## Step 4.6: Add Expense Template  
  
Open `src/app/components/add-expense/add-expense.html`:  
  
```html  
<div class="add-expense-container">  
  <div class="form-card card">  
    <h2>Add New Expense</h2>  
  
    <div class="alert alert-error" *ngIf="errorMessage">  
      {{ errorMessage }}  
    </div>  
  
    <form (ngSubmit)="onSubmit()">  
      <div class="form-row">  
        <div class="form-group">  
          <label for="amount">Amount *</label>  
          <input  
            type="number"  
            id="amount"  
            name="amount"  
            class="form-control"  
            [(ngModel)]="expense.amount"  
            placeholder="Enter amount"  
            min="0"  
            step="0.01"  
          />  
        </div>  
  
        <div class="form-group">  
          <label for="date">Date *</label>  
          <input  
            type="date"  
            id="date"  
            name="date"  
            class="form-control"  
            [(ngModel)]="expense.date"  
            [max]="getTodayDate()"  
          />  
        </div>  
      </div>  
  
      <div class="form-row">  
        <div class="form-group">  
          <label for="category">Category *</label>  
          <select  
            id="category"  
            name="category"  
            class="form-control"  
            [(ngModel)]="expense.category"  
          >  
            <option value="">Select Category</option>  
            <option *ngFor="let cat of categories" [value]="cat">  
              {{ cat }}  
            </option>  
          </select>  
        </div>  
  
        <div class="form-group">  
          <label for="paymentMethod">Payment Method *</label>  
          <select  
            id="paymentMethod"  
            name="paymentMethod"  
            class="form-control"  
            [(ngModel)]="expense.paymentMethod"  
          >  
            <option value="">Select Payment Method</option>  
            <option *ngFor="let method of paymentMethods" [value]="method">  
              {{ method }}  
            </option>  
          </select>  
        </div>  
      </div>  
  
      <div class="form-group">  
        <label for="description">Description *</label>  
        <textarea  
          id="description"  
          name="description"  
          class="form-control"  
          [(ngModel)]="expense.description"  
          placeholder="Enter expense description"  
          rows="3"  
        ></textarea>  
      </div>  
  
      <div class="form-actions">  
        <button type="button" class="btn btn-secondary" (click)="cancel()">  
          Cancel  
        </button>  
        <button type="submit" class="btn btn-primary" [disabled]="isSubmitting">  
          <span *ngIf="!isSubmitting">Add Expense</span>  
          <span *ngIf="isSubmitting">Adding...</span>  
        </button>  
      </div>  
    </form>  
  </div>  
</div>  
```  
  
---  
  
## Step 4.7: Add Routes  
  
Update `src/app/app.routes.ts`:  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './components/login/login';  
import { DashboardComponent } from './components/dashboard/dashboard';  
import { ExpenseListComponent } from './components/expense-list/expense-list';  
import { AddExpenseComponent } from './components/add-expense/add-expense';  
import { authGuard } from './guards/auth.guard';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  {   
    path: 'dashboard',   
    component: DashboardComponent,  
    canActivate: [authGuard]  
  },  
  {   
    path: 'expenses',   
    component: ExpenseListComponent,  
    canActivate: [authGuard]  
  },  
  {   
    path: 'expenses/add',   
    component: AddExpenseComponent,  
    canActivate: [authGuard]  
  },  
  { path: '**', redirectTo: '/login' }  
];  
```  
  
---  
  
## 🎯 Challenge 1: Implement Edit Functionality  
  
**Task:** Create edit expense component and wire it up.  
  
**Generate component:**  
```bash  
ng generate component components/edit-expense  
```  
  
**What to implement:**  
  
1. **Component TypeScript:**  
```typescript  
// Get expense ID from route params  
// Load expense data  
// Pre-fill form  
// Update on submit  
```  
  
2. **Template:**  
```html  
<!-- Same as add-expense but:  
  - Title: "Edit Expense"  
  - Button: "Update Expense"  
  - Pre-filled values  
-->  
```  
  
3. **Wire up in expense-list:**  
```typescript  
editExpense(id: number): void {  
  this.router.navigate(['/expenses/edit', id]);  
}  
```  
  
4. **Add route:**  
```typescript  
{   
  path: 'expenses/edit/:id',   
  component: EditExpenseComponent,  
  canActivate: [authGuard]  
}  
```  
  
**Hints:**  
  
```typescript  
// In EditExpenseComponent  
ngOnInit(): void {  
  this.route.params.subscribe(params => {  
    const id = +params['id'];  
    this.loadExpense(id);  
  });  
}  
  
loadExpense(id: number): void {  
  this.expenseService.getExpenseById(id).subscribe({  
    next: (data) => {  
      this.expense = data;  
    }  
  });  
}  
  
onSubmit(): void {  
  this.expenseService.updateExpense(this.expense.id, this.expense)  
    .subscribe({  
      next: () => {  
        this.router.navigate(['/expenses']);  
      }  
    });  
}  
```  
  
---  
  
## 🎯 Challenge 2: Implement Delete Functionality  
  
**Task:** Add delete confirmation and implementation.  
  
**In expense-list.ts:**  
  
```typescript  
deleteExpense(expense: Expense): void {  
  // TODO: Implement  
  // 1. Show confirmation dialog  
  // 2. If confirmed, call expenseService.deleteExpense()  
  // 3. On success, reload expenses  
  // 4. Show success message (optional)  
}  
```  
  
**Hints:**  
  
```typescript  
const confirmed = confirm(  
  `Are you sure you want to delete "${expense.description}"?`  
);  
  
if (confirmed) {  
  this.expenseService.deleteExpense(expense.id).subscribe({  
    next: () => {  
      this.loadExpenses(); // Reload list  
    },  
    error: (error) => {  
      alert('Failed to delete expense');  
    }  
  });  
}  
```  
  
**Wire up in template:**  
  
```html  
<button   
  class="btn-icon btn-delete"   
  (click)="deleteExpense(expense)"  
  title="Delete"  
>  
  🗑️  
</button>  
```  
  
---  
  
## 🎯 Challenge 3: Add Sorting  
  
**Task:** Allow users to sort the expense table.  
  
**Add to component:**  
  
```typescript  
sortField: string = 'date';  
sortDirection: 'asc' | 'desc' = 'desc';  
  
sortExpenses(field: string): void {  
  // TODO: Implement  
  // 1. If same field, toggle direction  
  // 2. If different field, set to desc  
  // 3. Sort filteredExpenses array  
}  
```  
  
**Add to template:**  
  
```html  
<th (click)="sortExpenses('date')">  
  Date   
  <span *ngIf="sortField === 'date'">  
    {{ sortDirection === 'asc' ? '▲' : '▼' }}  
  </span>  
</th>  
```  
  
**Hint:**  
  
```typescript  
sortExpenses(field: string): void {  
  if (this.sortField === field) {  
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';  
  } else {  
    this.sortField = field;  
    this.sortDirection = 'desc';  
  }  
  
  this.filteredExpenses.sort((a, b) => {  
    const aValue = a[field];  
    const bValue = b[field];  
    const comparison = aValue > bValue ? 1 : -1;  
    return this.sortDirection === 'asc' ? comparison : -comparison;  
  });  
}  
```  
  
---  
  
## 🎯 Challenge 4: Add Pagination  
  
**Task:** Implement pagination for large expense lists.  
  
**Add to component:**  
  
```typescript  
currentPage: number = 1;  
itemsPerPage: number = 10;  
totalPages: number = 0;  
  
get paginatedExpenses(): Expense[] {  
  // TODO: Implement  
  // Calculate start and end index  
  // Return slice of filteredExpenses  
}  
  
changePage(page: number): void {  
  // Update currentPage  
}  
```  
  
**Add to template:**  
  
```html  
<div class="pagination">  
  <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1">  
    Previous  
  </button>  
  <span>Page {{ currentPage }} of {{ totalPages }}</span>  
  <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages">  
    Next  
  </button>  
</div>  
```  
  
---  
  
## Verification Checklist  
  
- [ ] Expense list displays all expenses  
- [ ] Can add new expense  
- [ ] Filters work (category, payment, search)  
- [ ] Clear filters button works  
- [ ] Challenge 1: Edit functionality implemented  
- [ ] Challenge 2: Delete with confirmation works  
- [ ] Challenge 3: Sorting implemented  
- [ ] Challenge 4: Pagination working  
- [ ] All validations working  
- [ ] Navigation between pages works  
  
---  
  
## What's Next?  
  
In **Phase 5**, you'll:  
- Create Budget Manager  
- Set category budgets  
- Compare budget vs actual  
- **Challenge:** Add budget alerts  
  
---  
  
**Complete all CRUD operations to master Angular forms and services!** 📝  
