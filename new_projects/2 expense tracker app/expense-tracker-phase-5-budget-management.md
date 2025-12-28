# Expense Tracker - Phase 5: Budget Management  
  
## Introduction  
  
In this phase, you'll implement budget management - allowing users to set monthly budgets for each category and track their spending against those limits.  
  
---  
  
## What You'll Learn  
  
- Managing related data (budgets and expenses)  
- Calculating comparisons  
- Progress indicators  
- Budget vs actual analysis  
- Color-coded alerts  
  
---  
  
## Step 5.1: Create Budget Service  
  
Generate service:  
```bash  
ng generate service services/budget  
```  
  
Open `src/app/services/budget.service.ts`:  
  
```typescript  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Budget } from '../models/budget.model';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class BudgetService {  
  private apiUrl = 'http://localhost:3000/budgets';  
  
  constructor(private http: HttpClient) { }  
  
  // Get user's budgets for a specific month  
  getUserBudgets(userId: number, month: string): Observable<Budget[]> {  
    return this.http.get<Budget[]>(`${this.apiUrl}?userId=${userId}&month=${month}`);  
  }  
  
  // Create budget  
  createBudget(budget: Budget): Observable<Budget> {  
    return this.http.post<Budget>(this.apiUrl, budget);  
  }  
  
  // Update budget  
  updateBudget(id: number, budget: Budget): Observable<Budget> {  
    return this.http.put<Budget>(`${this.apiUrl}/${id}`, budget);  
  }  
  
  // TODO: Implement delete budget  
  // deleteBudget(id: number): Observable<void>  
  
  // TODO: Implement get budget by ID  
  // getBudgetById(id: number): Observable<Budget>  
}  
```  
  
---  
  
## Step 5.2: Create Budget Manager Component  
  
Generate component:  
```bash  
ng generate component components/budget-manager  
```  
  
Open `src/app/components/budget-manager/budget-manager.ts`:  
  
```typescript  
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { BudgetService } from '../../services/budget.service';  
import { ExpenseService } from '../../services/expense.service';  
import { AuthService } from '../../services/auth.service';  
import { UtilityService } from '../../services/utility.service';  
import { Budget } from '../../models/budget.model';  
import { Expense } from '../../models/expense.model';  
import { EXPENSE_CATEGORIES } from '../../constants/app.constants';  
  
interface BudgetStatus {  
  budget: Budget;  
  spent: number;  
  remaining: number;  
  percentage: number;  
  status: 'safe' | 'warning' | 'danger';  
}  
  
@Component({  
  selector: 'app-budget-manager',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './budget-manager.html',  
  styleUrl: './budget-manager.css'  
})  
export class BudgetManagerComponent implements OnInit {  
  budgets: Budget[] = [];  
  expenses: Expense[] = [];  
  budgetStatuses: BudgetStatus[] = [];  
    
  categories = EXPENSE_CATEGORIES;  
  currentMonth: string = '';  
    
  // New budget form  
  showAddForm: boolean = false;  
  newBudget: Budget = {  
    id: 0,  
    userId: 0,  
    category: '',  
    budgetAmount: 0,  
    month: ''  
  };  
  
  isLoading: boolean = true;  
  
  constructor(  
    private budgetService: BudgetService,  
    private expenseService: ExpenseService,  
    private authService: AuthService,  
    private utilityService: UtilityService  
  ) { }  
  
  ngOnInit(): void {  
    this.currentMonth = this.utilityService.getCurrentMonth();  
    this.newBudget.month = this.currentMonth;  
    this.newBudget.userId = this.authService.getUserId();  
    this.loadData();  
  }  
  
  loadData(): void {  
    const userId = this.authService.getUserId();  
    this.isLoading = true;  
  
    // Load budgets and expenses together  
    Promise.all([  
      this.budgetService.getUserBudgets(userId, this.currentMonth).toPromise(),  
      this.expenseService.getUserExpenses(userId).toPromise()  
    ]).then(([budgets, expenses]) => {  
      this.budgets = budgets || [];  
      this.expenses = (expenses || []).filter(e =>   
        e.date.startsWith(this.currentMonth)  
      );  
      this.calculateBudgetStatuses();  
      this.isLoading = false;  
    }).catch(error => {  
      console.error('Error loading data:', error);  
      this.isLoading = false;  
    });  
  }  
  
  calculateBudgetStatuses(): void {  
    this.budgetStatuses = this.budgets.map(budget => {  
      // Calculate spent for this category  
      const spent = this.expenses  
        .filter(e => e.category === budget.category)  
        .reduce((sum, e) => sum + e.amount, 0);  
  
      const remaining = budget.budgetAmount - spent;  
      const percentage = (spent / budget.budgetAmount) * 100;  
  
      // Determine status  
      let status: 'safe' | 'warning' | 'danger' = 'safe';  
      if (percentage >= 100) {  
        status = 'danger';  
      } else if (percentage >= 80) {  
        status = 'warning';  
      }  
  
      return {  
        budget,  
        spent,  
        remaining,  
        percentage: Math.min(percentage, 100),  
        status  
      };  
    });  
  }  
  
  addBudget(): void {  
    if (!this.newBudget.category || this.newBudget.budgetAmount <= 0) {  
      alert('Please select category and enter valid amount');  
      return;  
    }  
  
    // Check if budget already exists for this category  
    const exists = this.budgets.some(b => b.category === this.newBudget.category);  
    if (exists) {  
      alert('Budget already exists for this category');  
      return;  
    }  
  
    this.budgetService.createBudget(this.newBudget).subscribe({  
      next: () => {  
        this.showAddForm = false;  
        this.resetForm();  
        this.loadData();  
      },  
      error: (error) => {  
        alert('Failed to create budget');  
      }  
    });  
  }  
  
  resetForm(): void {  
    this.newBudget = {  
      id: 0,  
      userId: this.authService.getUserId(),  
      category: '',  
      budgetAmount: 0,  
      month: this.currentMonth  
    };  
  }  
  
  formatCurrency(amount: number): string {  
    return this.utilityService.formatCurrency(amount);  
  }  
  
  getStatusClass(status: string): string {  
    return `status-${status}`;  
  }  
  
  // TODO: Implement update budget amount  
  // Should allow inline editing of budget amount  
  
  // TODO: Implement delete budget  
  // Should confirm and delete  
}  
```  
  
---  
  
## Step 5.3: Budget Manager Template  
  
Open `src/app/components/budget-manager/budget-manager.html`:  
  
```html  
<div class="budget-container">  
  <div class="budget-header">  
    <h2>Budget Manager - {{ currentMonth }}</h2>  
    <button class="btn btn-primary" (click)="showAddForm = true">  
      + Add Budget  
    </button>  
  </div>  
  
  <!-- Add Budget Form -->  
  <div class="add-budget-form card" *ngIf="showAddForm">  
    <h3>Add New Budget</h3>  
    <form (ngSubmit)="addBudget()">  
      <div class="form-row">  
        <div class="form-group">  
          <label for="category">Category</label>  
          <select  
            id="category"  
            class="form-control"  
            [(ngModel)]="newBudget.category"  
            name="category"  
          >  
            <option value="">Select Category</option>  
            <option *ngFor="let cat of categories" [value]="cat">  
              {{ cat }}  
            </option>  
          </select>  
        </div>  
  
        <div class="form-group">  
          <label for="amount">Budget Amount</label>  
          <input  
            type="number"  
            id="amount"  
            class="form-control"  
            [(ngModel)]="newBudget.budgetAmount"  
            name="amount"  
            placeholder="Enter budget amount"  
            min="0"  
          />  
        </div>  
      </div>  
  
      <div class="form-actions">  
        <button type="button" class="btn btn-secondary" (click)="showAddForm = false">  
          Cancel  
        </button>  
        <button type="submit" class="btn btn-primary">  
          Add Budget  
        </button>  
      </div>  
    </form>  
  </div>  
  
  <!-- Loading -->  
  <div class="loading" *ngIf="isLoading">  
    <p>Loading budgets...</p>  
  </div>  
  
  <!-- Budget List -->  
  <div class="budget-grid" *ngIf="!isLoading">  
    <div   
      class="budget-card card"   
      *ngFor="let status of budgetStatuses"  
      [ngClass]="getStatusClass(status.status)"  
    >  
      <div class="budget-category">  
        <h3>{{ status.budget.category }}</h3>  
        <span class="status-badge">{{ status.status }}</span>  
      </div>  
  
      <div class="budget-amounts">  
        <div class="amount-row">  
          <span>Budget:</span>  
          <strong>{{ formatCurrency(status.budget.budgetAmount) }}</strong>  
        </div>  
        <div class="amount-row">  
          <span>Spent:</span>  
          <strong class="spent">{{ formatCurrency(status.spent) }}</strong>  
        </div>  
        <div class="amount-row">  
          <span>Remaining:</span>  
          <strong [class.negative]="status.remaining < 0">  
            {{ formatCurrency(status.remaining) }}  
          </strong>  
        </div>  
      </div>  
  
      <div class="progress-bar">  
        <div   
          class="progress-fill"   
          [style.width.%]="status.percentage"  
          [ngClass]="getStatusClass(status.status)"  
        ></div>  
      </div>  
  
      <div class="percentage-text">  
        {{ status.percentage.toFixed(1) }}% used  
      </div>  
    </div>  
  
    <div class="no-budgets" *ngIf="budgetStatuses.length === 0">  
      <p>No budgets set for this month. Add your first budget!</p>  
    </div>  
  </div>  
</div>  
```  
  
---  
  
## Step 5.4: Budget Manager Styles  
  
Open `src/app/components/budget-manager/budget-manager.css`:  
  
```css  
.budget-container {  
  max-width: 1200px;  
  margin: 0 auto;  
}  
  
.budget-header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 20px;  
}  
  
.add-budget-form {  
  margin-bottom: 30px;  
}  
  
.budget-grid {  
  display: grid;  
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  
  gap: 20px;  
}  
  
.budget-card {  
  border-left: 4px solid #4caf50;  
}  
  
.budget-card.status-warning {  
  border-left-color: #ff9800;  
}  
  
.budget-card.status-danger {  
  border-left-color: #f44336;  
}  
  
.budget-category {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  margin-bottom: 15px;  
}  
  
.budget-category h3 {  
  margin: 0;  
  color: #2c3e50;  
}  
  
.status-badge {  
  padding: 4px 12px;  
  border-radius: 12px;  
  font-size: 12px;  
  font-weight: 600;  
  text-transform: uppercase;  
}  
  
.status-safe {  
  background: #d4edda;  
  color: #155724;  
}  
  
.status-warning {  
  background: #fff3cd;  
  color: #856404;  
}  
  
.status-danger {  
  background: #f8d7da;  
  color: #721c24;  
}  
  
.budget-amounts {  
  margin-bottom: 15px;  
}  
  
.amount-row {  
  display: flex;  
  justify-content: space-between;  
  padding: 8px 0;  
  border-bottom: 1px solid #ecf0f1;  
}  
  
.spent {  
  color: #e74c3c;  
}  
  
.negative {  
  color: #f44336;  
}  
  
.progress-bar {  
  height: 10px;  
  background: #ecf0f1;  
  border-radius: 5px;  
  overflow: hidden;  
  margin-bottom: 10px;  
}  
  
.progress-fill {  
  height: 100%;  
  transition: width 0.3s ease;  
}  
  
.progress-fill.status-safe {  
  background: #4caf50;  
}  
  
.progress-fill.status-warning {  
  background: #ff9800;  
}  
  
.progress-fill.status-danger {  
  background: #f44336;  
}  
  
.percentage-text {  
  text-align: center;  
  color: #7f8c8d;  
  font-size: 14px;  
}  
  
.no-budgets {  
  grid-column: 1 / -1;  
  text-align: center;  
  padding: 40px;  
  color: #7f8c8d;  
}  
```  
  
---  
  
## Step 5.5: Add Budget Route  
  
Update `src/app/app.routes.ts`:  
  
```typescript  
import { BudgetManagerComponent } from './components/budget-manager/budget-manager';  
  
// Add to routes array:  
{   
  path: 'budgets',   
  component: BudgetManagerComponent,  
  canActivate: [authGuard]  
}  
```  
  
---  
  
## 🎯 Challenge 1: Implement Update Budget  
  
**Task:** Allow users to edit budget amounts inline.  
  
**Add to component:**  
  
```typescript  
editingBudgetId: number | null = null;  
editAmount: number = 0;  
  
startEdit(budget: Budget): void {  
  // TODO: Set editingBudgetId and editAmount  
}  
  
saveEdit(budget: Budget): void {  
  // TODO: Update budget using service  
  // Reset editing state  
  // Reload data  
}  
  
cancelEdit(): void {  
  // Reset editing state  
}  
```  
  
**Add to template:**  
  
```html  
<div class="amount-row">  
  <span>Budget:</span>  
  <div *ngIf="status.budget.id !== editingBudgetId">  
    <strong>{{ formatCurrency(status.budget.budgetAmount) }}</strong>  
    <button class="btn-icon" (click)="startEdit(status.budget)">✏️</button>  
  </div>  
  <div *ngIf="status.budget.id === editingBudgetId">  
    <input type="number" [(ngModel)]="editAmount" />  
    <button (click)="saveEdit(status.budget)">✓</button>  
    <button (click)="cancelEdit()">✗</button>  
  </div>  
</div>  
```  
  
---  
  
## 🎯 Challenge 2: Add Budget Alerts  
  
**Task:** Show alerts when budget is close to limit or exceeded.  
  
**Add to component:**  
  
```typescript  
getBudgetAlerts(): { category: string, message: string, type: string }[] {  
  // TODO: Return array of alerts  
  // Warning if percentage >= 80  
  // Danger if percentage >= 100  
}  
```  
  
**Add to template:**  
  
```html  
<div class="alerts-section" *ngIf="getBudgetAlerts().length > 0">  
  <h3>Budget Alerts</h3>  
  <div   
    class="alert"   
    *ngFor="let alert of getBudgetAlerts()"  
    [ngClass]="'alert-' + alert.type"  
  >  
    {{ alert.message }}  
  </div>  
</div>  
```  
  
**Hint:**  
  
```typescript  
getBudgetAlerts() {  
  const alerts = [];  
    
  this.budgetStatuses.forEach(status => {  
    if (status.percentage >= 100) {  
      alerts.push({  
        category: status.budget.category,  
        message: `⚠️ ${status.budget.category} budget exceeded!`,  
        type: 'danger'  
      });  
    } else if (status.percentage >= 80) {  
      alerts.push({  
        category: status.budget.category,  
        message: `⚡ ${status.budget.category} budget at ${status.percentage.toFixed(0)}%`,  
        type: 'warning'  
      });  
    }  
  });  
    
  return alerts;  
}  
```  
  
---  
  
## 🎯 Challenge 3: Month Navigation  
  
**Task:** Allow viewing budgets for different months.  
  
**Add to component:**  
  
```typescript  
selectedMonth: string = '';  
  
changeMonth(direction: 'prev' | 'next'): void {  
  // TODO: Calculate previous/next month  
  // Update currentMonth  
  // Reload data  
}  
  
getMonthName(monthString: string): string {  
  // Convert "2025-01" to "January 2025"  
}  
```  
  
**Add to template:**  
  
```html  
<div class="month-selector">  
  <button (click)="changeMonth('prev')">◀</button>  
  <h3>{{ getMonthName(currentMonth) }}</h3>  
  <button (click)="changeMonth('next')" [disabled]="isCurrentMonth()">▶</button>  
</div>  
```  
  
---  
  
## 🎯 Challenge 4: Budget Summary  
  
**Task:** Show overall budget statistics.  
  
**Add to component:**  
  
```typescript  
getTotalBudget(): number {  
  // Sum of all budgets  
}  
  
getTotalSpent(): number {  
  // Sum of all spent amounts  
}  
  
getTotalRemaining(): number {  
  // Total budget - Total spent  
}  
  
getOverallPercentage(): number {  
  // (Total spent / Total budget) * 100  
}  
```  
  
**Add to template:**  
  
```html  
<div class="budget-summary card">  
  <h3>Overall Budget Summary</h3>  
  <div class="summary-grid">  
    <div class="summary-item">  
      <span>Total Budget</span>  
      <strong>{{ formatCurrency(getTotalBudget()) }}</strong>  
    </div>  
    <!-- Add more summary items -->  
  </div>  
</div>  
```  
  
---  
  
## Verification Checklist  
  
- [ ] Budget manager displays correctly  
- [ ] Can add new budgets  
- [ ] Budget statuses calculate correctly  
- [ ] Progress bars show correct percentages  
- [ ] Colors change based on status (safe/warning/danger)  
- [ ] Challenge 1: Can update budget amounts  
- [ ] Challenge 2: Alerts showing for overspending  
- [ ] Challenge 3: Can navigate between months  
- [ ] Challenge 4: Summary statistics showing  
  
---  
  
## What's Next?  
  
In **Phase 6**, you'll:  
- Install Chart.js  
- Create data visualizations  
- Build pie charts for categories  
- Build line charts for trends  
- **Challenge:** Add bar chart for budget comparison  
  
---  
  
**Master budget management to complete the financial tracking system!** 💰  
