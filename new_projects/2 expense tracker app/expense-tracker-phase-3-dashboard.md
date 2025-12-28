# Expense Tracker - Phase 3: Dashboard Component

## Introduction

Time to build the heart of your application - the Dashboard! This is where users see their financial overview at a glance. We'll create the basic dashboard structure together, and you'll implement the statistics calculations.

---

## What You'll Learn

- Building dashboard layouts
- Fetching and displaying data
- Calculating aggregates
- Using RxJS operators
- Data filtering techniques

---

## Step 3.1: Create Expense Service

Generate service:
```bash
ng generate service services/expense
```

Open `src/app/services/expense.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) { }

  // Get all expenses for a user
  getUserExpenses(userId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Get single expense
  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  // Create expense
  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // TODO: Implement update method
  // updateExpense(id: number, expense: Expense): Observable<Expense>

  // TODO: Implement delete method
  // deleteExpense(id: number): Observable<void>
}
```

---

## Step 3.2: Create Dashboard Component

Generate component:
```bash
ng generate component components/dashboard
```

Open `src/app/components/dashboard/dashboard.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  recentExpenses: Expense[] = [];
  
  // Statistics
  totalExpenses: number = 0;
  monthlyExpenses: number = 0;
  expenseCount: number = 0;
  
  isLoading: boolean = true;
  userName: string = '';

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.userName = user.fullName;
      this.loadExpenses(user.id);
    }
  }

  loadExpenses(userId: number): void {
    this.isLoading = true;
    this.expenseService.getUserExpenses(userId).subscribe({
      next: (data) => {
        this.expenses = data;
        this.calculateStatistics();
        this.getRecentExpenses();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.isLoading = false;
      }
    });
  }

  calculateStatistics(): void {
    // Total of all expenses
    this.totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Count of expenses
    this.expenseCount = this.expenses.length;
    
    // TODO: Calculate monthly expenses (current month only)
    // Hint: Filter expenses by current month, then sum amounts
    // Use utilityService.getCurrentMonth() to get current month
  }

  getRecentExpenses(): void {
    // Get last 5 expenses sorted by date
    this.recentExpenses = this.expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }

  formatCurrency(amount: number): string {
    return this.utilityService.formatCurrency(amount);
  }

  formatDate(dateString: string): string {
    return this.utilityService.formatDate(dateString);
  }

  // Navigation methods
  addExpense(): void {
    this.router.navigate(['/expenses/add']);
  }

  viewAllExpenses(): void {
    this.router.navigate(['/expenses']);
  }
}
```

---

## Step 3.3: Dashboard Template

Open `src/app/components/dashboard/dashboard.html`:

```html
<div class="dashboard-container">
  <!-- Header -->
  <div class="dashboard-header">
    <h2>Welcome back, {{ userName }}! 👋</h2>
    <button class="btn btn-primary" (click)="addExpense()">
      + Add Expense
    </button>
  </div>

  <!-- Loading State -->
  <div class="loading" *ngIf="isLoading">
    <p>Loading your expenses...</p>
  </div>

  <!-- Statistics Cards -->
  <div class="stats-grid" *ngIf="!isLoading">
    <div class="stat-card stat-total">
      <div class="stat-icon">💰</div>
      <div class="stat-info">
        <h3>{{ formatCurrency(totalExpenses) }}</h3>
        <p>Total Expenses</p>
      </div>
    </div>

    <div class="stat-card stat-monthly">
      <div class="stat-icon">📅</div>
      <div class="stat-info">
        <h3>{{ formatCurrency(monthlyExpenses) }}</h3>
        <p>This Month</p>
      </div>
    </div>

    <div class="stat-card stat-count">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <h3>{{ expenseCount }}</h3>
        <p>Total Transactions</p>
      </div>
    </div>
  </div>

  <!-- Recent Expenses -->
  <div class="recent-section" *ngIf="!isLoading">
    <div class="section-header">
      <h3>Recent Expenses</h3>
      <button class="btn btn-secondary" (click)="viewAllExpenses()">
        View All
      </button>
    </div>

    <div class="expenses-list" *ngIf="recentExpenses.length > 0">
      <div class="expense-item" *ngFor="let expense of recentExpenses">
        <div class="expense-category">
          <span class="category-badge">{{ expense.category }}</span>
        </div>
        <div class="expense-details">
          <h4>{{ expense.description }}</h4>
          <p>{{ formatDate(expense.date) }} • {{ expense.paymentMethod }}</p>
        </div>
        <div class="expense-amount">
          <strong>{{ formatCurrency(expense.amount) }}</strong>
        </div>
      </div>
    </div>

    <div class="no-expenses" *ngIf="recentExpenses.length === 0">
      <p>No expenses yet. Start tracking by adding your first expense!</p>
    </div>
  </div>
</div>
```

---

## Step 3.4: Dashboard Styles

Open `src/app/components/dashboard/dashboard.css`:

```css
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h2 {
  color: #2c3e50;
  font-size: 32px;
  margin: 0;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  font-size: 48px;
}

.stat-info h3 {
  font-size: 32px;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.stat-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
}

.stat-total {
  border-left: 4px solid #4caf50;
}

.stat-monthly {
  border-left: 4px solid #2196f3;
}

.stat-count {
  border-left: 4px solid #ff9800;
}

/* Recent Expenses Section */
.recent-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  color: #2c3e50;
}

/* Expense List */
.expenses-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.expense-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  gap: 15px;
}

.category-badge {
  background: #4caf50;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.expense-details {
  flex: 1;
}

.expense-details h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.expense-details p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
}

.expense-amount strong {
  font-size: 20px;
  color: #e74c3c;
}

.no-expenses {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #7f8c8d;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .expense-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## Step 3.5: Add Dashboard Route

Open `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];
```

---

## 🎯 Challenge 1: Calculate Monthly Expenses

**Task:** Complete the `calculateStatistics()` method to calculate this month's expenses.

**What you need:**

```typescript
calculateStatistics(): void {
  this.totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  this.expenseCount = this.expenses.length;
  
  // TODO: Implement this
  // 1. Get current month using utilityService.getCurrentMonth()
  // 2. Filter expenses where date starts with current month
  // 3. Sum the amounts of filtered expenses
  // 4. Store in this.monthlyExpenses
}
```

**Hints:**

```typescript
const currentMonth = this.utilityService.getCurrentMonth(); // "2025-01"
const monthlyExpensesList = this.expenses.filter(expense => 
  expense.date.startsWith(currentMonth)
);
this.monthlyExpenses = monthlyExpensesList.reduce(/* sum amounts */);
```

---

## 🎯 Challenge 2: Add Category-wise Summary

**Task:** Create a method that calculates spending by category.

**Add to component:**

```typescript
categoryExpenses: Map<string, number> = new Map();

calculateCategoryExpenses(): void {
  // TODO: Implement this
  // 1. Create a map to store category totals
  // 2. Loop through expenses
  // 3. For each expense, add amount to respective category
  // 4. Store in this.categoryExpenses
}
```

**Add to template:**

```html
<!-- After recent expenses section -->
<div class="category-summary">
  <h3>Spending by Category</h3>
  <div class="category-list">
    <!-- Use *ngFor to display each category and its total -->
    <!-- Show category name and formatted amount -->
  </div>
</div>
```

**Hint:**

```typescript
this.categoryExpenses = new Map();
this.expenses.forEach(expense => {
  const current = this.categoryExpenses.get(expense.category) || 0;
  this.categoryExpenses.set(expense.category, current + expense.amount);
});
```

---

## 🎯 Challenge 3: Add Quick Stats

**Task:** Add more statistical cards to the dashboard.

**Cards to add:**

1. **Average Expense:** Total / Count
2. **Highest Expense:** Find maximum amount
3. **Most Used Category:** Category with most transactions

**Implementation:**

```typescript
averageExpense: number = 0;
highestExpense: number = 0;
mostUsedCategory: string = '';

calculateQuickStats(): void {
  // TODO: Calculate average
  this.averageExpense = this.totalExpenses / this.expenseCount;
  
  // TODO: Find highest expense
  // Hint: Math.max(...this.expenses.map(e => e.amount))
  
  // TODO: Find most used category
  // Hint: Create frequency map and find max
}
```

**Add to template's stats-grid:**

```html
<div class="stat-card">
  <div class="stat-icon">📈</div>
  <div class="stat-info">
    <h3>{{ formatCurrency(averageExpense) }}</h3>
    <p>Average Expense</p>
  </div>
</div>
```

---

## 🎯 Challenge 4: Implement Expense Trends

**Task:** Show comparison with last month.

**Add to component:**

```typescript
lastMonthExpenses: number = 0;
percentageChange: number = 0;

calculateTrends(): void {
  // TODO: 
  // 1. Get last month in "2025-12" format
  // 2. Filter expenses for last month
  // 3. Calculate total
  // 4. Calculate percentage change: 
  //    ((current - last) / last) * 100
}

getTrendIcon(): string {
  // Return '📈' if increased, '📉' if decreased
}

getTrendText(): string {
  // Return text like "+15% from last month" or "-10% from last month"
}
```

**Add to template:**

```html
<div class="trend-indicator">
  <span class="trend-icon">{{ getTrendIcon() }}</span>
  <span class="trend-text">{{ getTrendText() }}</span>
</div>
```

---

## Testing Your Dashboard

**Test Scenarios:**

1. **Login and View Dashboard:**
   - Should show statistics
   - Should show recent expenses
   - All amounts formatted correctly

2. **Check Calculations:**
   - Total expenses = Sum of all sample expenses
   - Monthly expenses = Sum of current month only
   - Count = Number of expenses

3. **Recent Expenses:**
   - Should show latest 5
   - Sorted by date (newest first)
   - All details visible

4. **Challenge Features:**
   - Monthly calculation working
   - Category summary displaying
   - Quick stats accurate
   - Trends showing correctly

---

## Common Issues & Solutions

**Issue 1: Statistics showing 0**
- Check expenses are loading
- Verify calculateStatistics() is called
- Check reduce logic

**Issue 2: Dates not formatting**
- Verify UtilityService is working
- Check date format in data

**Issue 3: Monthly expenses incorrect**
- Verify getCurrentMonth() returns correct format
- Check filter logic with startsWith()

---

## Verification Checklist

- [ ] Dashboard displays after login
- [ ] Three stat cards showing
- [ ] Total expenses calculated correctly
- [ ] Recent expenses displaying (5 items)
- [ ] Challenge 1: Monthly expenses calculated
- [ ] Challenge 2: Category summary implemented
- [ ] Challenge 3: Quick stats added
- [ ] Challenge 4: Trends showing
- [ ] All amounts formatted as currency
- [ ] All dates formatted properly
- [ ] Navigation buttons work

---

## Solution Hints

**Monthly Expenses:**
```typescript
const currentMonth = this.utilityService.getCurrentMonth();
this.monthlyExpenses = this.expenses
  .filter(e => e.date.startsWith(currentMonth))
  .reduce((sum, e) => sum + e.amount, 0);
```

**Category Map in Template:**
```html
<div *ngFor="let entry of categoryExpenses | keyvalue">
  <span>{{ entry.key }}</span>
  <span>{{ formatCurrency(entry.value) }}</span>
</div>
```

**Highest Expense:**
```typescript
this.highestExpense = Math.max(...this.expenses.map(e => e.amount));
```

---

## What's Next?

In **Phase 4**, you'll:
- Create Expense List Component
- Build Add Expense Form
- **Challenge:** Implement Edit and Delete functionality
- Add filtering and sorting

---

## Key Concepts Learned

1. **Data aggregation** using reduce()
2. **Array filtering** for date ranges
3. **Map data structure** for category tracking
4. **Statistical calculations** for insights
5. **Dashboard design patterns**

---

**Complete all challenges to master data manipulation in Angular!** 📊
