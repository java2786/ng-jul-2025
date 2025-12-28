# Expense Tracker - Phase 6: Data Visualization with Charts

## Introduction

Time to make your data come alive with beautiful charts! In this phase, you'll integrate Chart.js to create pie charts, line charts, and more to visualize spending patterns.

---

## What You'll Learn

- Installing and configuring Chart.js
- Creating pie charts
- Creating line charts
- Data transformation for charts
- Interactive visualizations

---

## Step 6.1: Install Chart.js

Run in terminal:

```bash
npm install chart.js ng2-charts
```

---

## Step 6.2: Create Reports Component

Generate component:
```bash
ng generate component components/reports
```

Open `src/app/components/reports/reports.ts`:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { BudgetService } from '../../services/budget.service';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';
import { Expense } from '../../models/expense.model';
import { Budget } from '../../models/budget.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements OnInit {
  expenses: Expense[] = [];
  budgets: Budget[] = [];
  currentMonth: string = '';

  // Pie Chart - Category Distribution
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#ff9800',
        '#2196f3',
        '#e91e63',
        '#f44336',
        '#9c27b0',
        '#4caf50',
        '#00bcd4',
        '#ff5722'
      ]
    }]
  };
  
  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Spending by Category'
      }
    }
  };

  // Line Chart - Daily Spending Trend
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      label: 'Daily Spending',
      data: [],
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  lineChartType: ChartType = 'line';
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Daily Spending Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  isLoading: boolean = true;

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.currentMonth = this.utilityService.getCurrentMonth();
    this.loadData();
  }

  loadData(): void {
    const userId = this.authService.getUserId();
    this.isLoading = true;

    this.expenseService.getUserExpenses(userId).subscribe({
      next: (expenses) => {
        this.expenses = expenses.filter(e => 
          e.date.startsWith(this.currentMonth)
        );
        this.preparePieChartData();
        this.prepareLineChartData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  preparePieChartData(): void {
    // Group expenses by category
    const categoryMap = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    // Convert to chart data
    this.pieChartData.labels = Array.from(categoryMap.keys());
    this.pieChartData.datasets[0].data = Array.from(categoryMap.values());
  }

  prepareLineChartData(): void {
    // Group expenses by date
    const dateMap = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const current = dateMap.get(expense.date) || 0;
      dateMap.set(expense.date, current + expense.amount);
    });

    // Sort by date
    const sortedDates = Array.from(dateMap.keys()).sort();
    
    // Format dates for labels
    this.lineChartData.labels = sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    this.lineChartData.datasets[0].data = sortedDates.map(date => 
      dateMap.get(date) || 0
    );
  }

  // TODO: Implement bar chart for budget comparison
  // Should show budget vs actual for each category
}
```

---

## Step 6.3: Reports Template

Open `src/app/components/reports/reports.html`:

```html
<div class="reports-container">
  <div class="reports-header">
    <h2>Financial Reports</h2>
    <p>Visual insights for {{ currentMonth }}</p>
  </div>

  <div class="loading" *ngIf="isLoading">
    <p>Loading reports...</p>
  </div>

  <div class="charts-grid" *ngIf="!isLoading">
    <!-- Pie Chart -->
    <div class="chart-card card">
      <canvas 
        baseChart
        [data]="pieChartData"
        [type]="pieChartType"
        [options]="pieChartOptions"
      ></canvas>
    </div>

    <!-- Line Chart -->
    <div class="chart-card card">
      <canvas 
        baseChart
        [data]="lineChartData"
        [type]="lineChartType"
        [options]="lineChartOptions"
      ></canvas>
    </div>

    <!-- TODO: Add bar chart for budget comparison -->
    
    <!-- Summary Stats -->
    <div class="stats-card card">
      <h3>Quick Stats</h3>
      <!-- Add summary statistics here -->
    </div>
  </div>
</div>
```

---

## Step 6.4: Reports Styles

Open `src/app/components/reports/reports.css`:

```css
.reports-container {
  max-width: 1200px;
  margin: 0 auto;
}

.reports-header {
  text-align: center;
  margin-bottom: 30px;
}

.reports-header h2 {
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.reports-header p {
  color: #7f8c8d;
  margin: 0;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  padding: 24px;
}

.stats-card {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Step 6.5: Add Reports Route

Update `src/app/app.routes.ts`:

```typescript
import { ReportsComponent } from './components/reports/reports';

// Add to routes:
{ 
  path: 'reports', 
  component: ReportsComponent,
  canActivate: [authGuard]
}
```

---

## 🎯 Challenge 1: Add Budget vs Actual Bar Chart

**Task:** Create a bar chart comparing budget and actual spending.

**Add to component:**

```typescript
barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    {
      label: 'Budget',
      data: [],
      backgroundColor: '#4caf50'
    },
    {
      label: 'Actual',
      data: [],
      backgroundColor: '#f44336'
    }
  ]
};

barChartType: ChartType = 'bar';
barChartOptions: ChartConfiguration['options'] = {
  // TODO: Configure options
};

prepareBarChartData(): void {
  // TODO: 
  // 1. Load budgets for current month
  // 2. Calculate actual spending per category
  // 3. Populate chart data
}
```

**Hints:**

```typescript
ngOnInit(): void {
  Promise.all([
    this.expenseService.getUserExpenses(userId).toPromise(),
    this.budgetService.getUserBudgets(userId, this.currentMonth).toPromise()
  ]).then(([expenses, budgets]) => {
    this.expenses = expenses.filter(...);
    this.budgets = budgets;
    this.preparePieChartData();
    this.prepareLineChartData();
    this.prepareBarChartData(); // Add this
  });
}

prepareBarChartData(): void {
  const categories = this.budgets.map(b => b.category);
  const budgetAmounts = this.budgets.map(b => b.budgetAmount);
  
  const actualAmounts = categories.map(category => {
    return this.expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  });

  this.barChartData.labels = categories;
  this.barChartData.datasets[0].data = budgetAmounts;
  this.barChartData.datasets[1].data = actualAmounts;
}
```

---

## 🎯 Challenge 2: Add Doughnut Chart

**Task:** Create a doughnut chart for payment method distribution.

**What to implement:**

```typescript
doughnutChartData: ChartData<'doughnut'> = {
  labels: [],
  datasets: [{
    data: []
  }]
};

doughnutChartType: ChartType = 'doughnut';

prepareDoughnutChartData(): void {
  // TODO: Group expenses by payment method
  // Similar to pie chart logic
}
```

---

## 🎯 Challenge 3: Add Month-over-Month Comparison

**Task:** Show spending comparison across multiple months.

**Add to component:**

```typescript
multiLineChartData: ChartData<'line'> = {
  labels: [], // Days of month
  datasets: [
    { label: 'Current Month', data: [], borderColor: '#4caf50' },
    { label: 'Last Month', data: [], borderColor: '#2196f3' },
    { label: 'Two Months Ago', data: [], borderColor: '#ff9800' }
  ]
};

prepareMultiLineData(): void {
  // TODO:
  // 1. Get expenses for last 3 months
  // 2. Group by date
  // 3. Create datasets for each month
}
```

---

## 🎯 Challenge 4: Add Export to PDF

**Task:** Allow users to download reports as PDF.

**Install library:**
```bash
npm install jspdf
```

**Implementation:**

```typescript
import jsPDF from 'jspdf';

exportToPDF(): void {
  // TODO:
  // 1. Create new jsPDF instance
  // 2. Add title and data
  // 3. Add chart images (using canvas.toDataURL())
  // 4. Save PDF
}
```

**Hint:**

```typescript
exportToPDF(): void {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Expense Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Month: ${this.currentMonth}`, 20, 30);
  
  // Add more content...
  
  doc.save(`expense-report-${this.currentMonth}.pdf`);
}
```

---

## 🎯 Challenge 5: Add Interactive Filters

**Task:** Add date range picker for dynamic chart updates.

**Add to component:**

```typescript
startDate: string = '';
endDate: string = '';

filterByDateRange(): void {
  // TODO: Filter expenses by date range
  // Update all charts
}
```

**Add to template:**

```html
<div class="date-filter card">
  <h3>Filter by Date Range</h3>
  <div class="filter-inputs">
    <input type="date" [(ngModel)]="startDate" />
    <input type="date" [(ngModel)]="endDate" />
    <button class="btn btn-primary" (click)="filterByDateRange()">
      Apply Filter
    </button>
  </div>
</div>
```

---

## 🎯 Challenge 6: Add Expense Trends Analysis

**Task:** Show insights like:
- Highest spending day
- Most used payment method
- Average daily spending
- Spending trend (increasing/decreasing)

**Implementation:**

```typescript
getHighestSpendingDay(): { date: string, amount: number } {
  // TODO: Find day with maximum spending
}

getMostUsedPaymentMethod(): string {
  // TODO: Find most frequent payment method
}

getAverageDailySpending(): number {
  // TODO: Calculate average
}

getSpendingTrend(): 'increasing' | 'decreasing' | 'stable' {
  // TODO: Compare first half vs second half of month
}
```

**Add to template:**

```html
<div class="insights-section card">
  <h3>Spending Insights</h3>
  <div class="insight-item">
    <span>Highest Spending Day:</span>
    <strong>{{ getHighestSpendingDay().date }} - {{ formatCurrency(getHighestSpendingDay().amount) }}</strong>
  </div>
  <!-- Add more insights -->
</div>
```

---

## Verification Checklist

- [ ] Chart.js installed correctly
- [ ] Pie chart displays category distribution
- [ ] Line chart shows daily trends
- [ ] Charts update with data changes
- [ ] Challenge 1: Bar chart for budget comparison
- [ ] Challenge 2: Doughnut chart for payment methods
- [ ] Challenge 3: Multi-month comparison
- [ ] Challenge 4: PDF export working
- [ ] Challenge 5: Date range filters working
- [ ] Challenge 6: Insights showing correctly

---

## Common Issues & Solutions

**Issue 1: Charts not displaying**
- Verify Chart.js is installed
- Check imports are correct
- Ensure BaseChartDirective is imported

**Issue 2: Data not updating**
- Check chart data is being prepared
- Verify observables are subscribed
- Use change detection if needed

**Issue 3: Chart looks broken**
- Check responsive property is true
- Verify container has proper sizing
- Check chart options configuration

---

## What's Next?

In **Phase 7** (Final), you'll:
- Add navigation menu
- Implement advanced filters
- Add CSV export
- Create monthly summary reports
- **Challenge:** Build complete financial dashboard

---

**Visualize your data beautifully with charts!** 📊
