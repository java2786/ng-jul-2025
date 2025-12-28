# Expense Tracker - Phase 1: Project Foundation  
  
## Introduction  
  
In this phase, you'll set up the Angular project foundation. We'll create the basic structure, models, and global styling. This phase focuses on understanding Angular architecture before diving into features.  
  
---  
  
## What You'll Learn  
  
- Creating Angular 20 projects  
- Understanding standalone components  
- Creating TypeScript interfaces  
- Configuring HttpClient  
- Setting up global styles  
- Project organization best practices  
  
---  
  
## Step 1.1: Create Angular Project  
  
Run in terminal:  
  
```bash  
ng new expense-tracker  
```  
  
**Configuration:**  
- Add routing? → **Yes**  
- Stylesheet format? → **CSS**  
  
Navigate to project:  
```bash  
cd expense-tracker  
```  
  
---  
  
## Step 1.2: Create Models  
  
Create models folder:  
```bash  
mkdir src/app/models  
```  
  
### User Model  
  
Create `src/app/models/user.model.ts`:  
  
```typescript  
export interface User {  
  id: number;  
  username: string;  
  password: string;  
  fullName: string;  
  email: string;  
  monthlyIncome: number;  
}  
```  
  
### Expense Model  
  
Create `src/app/models/expense.model.ts`:  
  
```typescript  
export interface Expense {  
  id: number;  
  userId: number;  
  amount: number;  
  category: string;  
  description: string;  
  date: string;          // Format: "2025-01-15"  
  paymentMethod: string;  
  createdAt: string;     // Format: "2025-01-15T12:30:00"  
}  
```  
  
### Budget Model  
  
Create `src/app/models/budget.model.ts`:  
  
```typescript  
export interface Budget {  
  id: number;  
  userId: number;  
  category: string;  
  budgetAmount: number;  
  month: string;         // Format: "2025-01"  
}  
```  
  
---  
  
## Step 1.3: Configure HttpClient  
  
Open `src/app/app.config.ts` and add:  
  
```typescript  
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';  
import { provideRouter } from '@angular/router';  
import { provideHttpClient } from '@angular/common/http';  
  
import { routes } from './app.routes';  
  
export const appConfig: ApplicationConfig = {  
  providers: [  
    provideZoneChangeDetection({ eventCoalescing: true }),  
    provideRouter(routes),  
    provideHttpClient()  // Add this line  
  ]  
};  
```  
  
---  
  
## Step 1.4: Global Styles  
  
Open `src/styles.css` and add:  
  
```css  
/* Reset */  
* {  
  margin: 0;  
  padding: 0;  
  box-sizing: border-box;  
}  
  
body {  
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);  
  min-height: 100vh;  
  color: #333;  
}  
  
/* Container */  
.container {  
  max-width: 1200px;  
  margin: 0 auto;  
  padding: 20px;  
}  
  
/* Card */  
.card {  
  background: white;  
  border-radius: 12px;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  
  padding: 24px;  
  margin-bottom: 20px;  
}  
  
/* Buttons */  
.btn {  
  padding: 12px 24px;  
  border: none;  
  border-radius: 8px;  
  font-size: 16px;  
  font-weight: 600;  
  cursor: pointer;  
  transition: all 0.3s ease;  
}  
  
.btn-primary {  
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);  
  color: white;  
}  
  
.btn-primary:hover {  
  transform: scale(1.05);  
}  
  
.btn-danger {  
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);  
  color: white;  
}  
  
.btn-warning {  
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);  
  color: white;  
}  
  
.btn-secondary {  
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);  
  color: white;  
}  
  
/* Form Controls */  
.form-group {  
  margin-bottom: 20px;  
}  
  
.form-group label {  
  display: block;  
  margin-bottom: 8px;  
  font-weight: 600;  
  color: #333;  
}  
  
.form-control {  
  width: 100%;  
  padding: 12px;  
  border: 2px solid #ddd;  
  border-radius: 8px;  
  font-size: 16px;  
}  
  
.form-control:focus {  
  outline: none;  
  border-color: #4caf50;  
}  
  
/* Alerts */  
.alert {  
  padding: 16px;  
  border-radius: 8px;  
  margin-bottom: 20px;  
}  
  
.alert-success {  
  background-color: #d4edda;  
  color: #155724;  
  border-left: 4px solid #28a745;  
}  
  
.alert-error {  
  background-color: #f8d7da;  
  color: #721c24;  
  border-left: 4px solid #dc3545;  
}  
  
/* Utility Classes */  
.text-center {  
  text-align: center;  
}  
  
.mt-20 {  
  margin-top: 20px;  
}  
  
.flex {  
  display: flex;  
}  
  
.justify-between {  
  justify-content: space-between;  
}  
  
.gap-10 {  
  gap: 10px;  
}  
```  
  
---  
  
## Step 1.5: Update App Component  
  
Open `src/app/app.component.html`:  
  
```html  
<div class="app-container">  
  <header class="app-header">  
    <div class="container">  
      <h1>💰 Expense Tracker</h1>  
      <p>Track your expenses, manage your budget</p>  
    </div>  
  </header>  
  
  <main class="app-main">  
    <div class="container">  
      <router-outlet></router-outlet>  
    </div>  
  </main>  
  
  <footer class="app-footer">  
    <div class="container">  
      <p>© 2025 Expense Tracker - Built with Angular</p>  
    </div>  
  </footer>  
</div>  
```  
  
Open `src/app/app.component.css`:  
  
```css  
.app-container {  
  min-height: 100vh;  
  display: flex;  
  flex-direction: column;  
}  
  
.app-header {  
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);  
  color: white;  
  padding: 30px 0;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  
  text-align: center;  
}  
  
.app-header h1 {  
  font-size: 42px;  
  margin: 0 0 10px 0;  
}  
  
.app-header p {  
  margin: 0;  
  opacity: 0.95;  
}  
  
.app-main {  
  flex: 1;  
  padding: 40px 0;  
}  
  
.app-footer {  
  background-color: #2c3e50;  
  color: white;  
  padding: 20px 0;  
  text-align: center;  
}  
```  
  
---  
  
## Step 1.6: Test the Application  
  
Run:  
```bash  
ng serve  
```  
  
Open browser: http://localhost:4200  
  
**You should see:**  
- Green gradient header with "💰 Expense Tracker"  
- Light green background  
- Footer at bottom  
  
---  
  
## 🎯 Challenge 1: Create Constants File  
  
**Task:** Create a constants file to store category options and payment methods.  
  
**File:** `src/app/constants/app.constants.ts`  
  
**What to create:**  
  
```typescript  
export const EXPENSE_CATEGORIES = [  
  'Food',  
  'Transport',  
  'Shopping',  
  'Bills',  
  'Entertainment',  
  'Healthcare',  
  'Education',  
  'Others'  
];  
  
export const PAYMENT_METHODS = [  
  // Add payment methods here  
  // Hint: UPI, Cash, Credit Card, Debit Card, Net Banking  
];  
  
export const MONTHS = [  
  // Add month names  
  // Hint: January, February, March...  
];  
```  
  
**Your Tasks:**  
1. Create the constants folder  
2. Complete the PAYMENT_METHODS array  
3. Complete the MONTHS array  
4. Export all constants  
  
**Test:** Try importing in any component:  
```typescript  
import { EXPENSE_CATEGORIES } from '../constants/app.constants';  
```  
  
---  
  
## 🎯 Challenge 2: Create Utility Service  
  
**Task:** Create a utility service with helper functions for date formatting and calculations.  
  
Generate service:  
```bash  
ng generate service services/utility  
```  
  
**What to implement:**  
  
```typescript  
import { Injectable } from '@angular/core';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class UtilityService {  
  
  constructor() { }  
  
  // TODO: Implement this method  
  // Format date from "2025-01-15" to "15 Jan 2025"  
  formatDate(dateString: string): string {  
    // Your code here  
    // Hint: Use Date object and MONTHS constant  
    return '';  
  }  
  
  // TODO: Implement this method  
  // Get current month in "2025-01" format  
  getCurrentMonth(): string {  
    // Your code here  
    // Hint: Use new Date(), getFullYear(), getMonth()  
    return '';  
  }  
  
  // TODO: Implement this method  
  // Format number to Indian currency ₹1,234.56  
  formatCurrency(amount: number): string {  
    // Your code here  
    // Hint: Use toLocaleString('en-IN')  
    return '';  
  }  
}  
```  
  
**Hints for Implementation:**  
  
**formatDate:**  
```typescript  
const date = new Date(dateString);  
const day = date.getDate();  
const month = MONTHS[date.getMonth()].substring(0, 3);  
const year = date.getFullYear();  
return `${day} ${month} ${year}`;  
```  
  
**getCurrentMonth:**  
```typescript  
const date = new Date();  
const year = date.getFullYear();  
const month = (date.getMonth() + 1).toString().padStart(2, '0');  
return `${year}-${month}`;  
```  
  
**formatCurrency:**  
```typescript  
return '₹' + amount.toLocaleString('en-IN', {  
  minimumFractionDigits: 2,  
  maximumFractionDigits: 2  
});  
```  
  
---  
  
## 🎯 Challenge 3: Create Category Interface  
  
**Task:** Create an interface for category data with icon and color.  
  
**File:** `src/app/models/category.model.ts`  
  
**What to create:**  
  
```typescript  
export interface CategoryInfo {  
  // Add properties:  
  // - name (string)  
  // - icon (string) - emoji  
  // - color (string) - hex color code  
}  
  
export const CATEGORY_INFO: CategoryInfo[] = [  
  // Add category info for each category  
  // Example:  
  // { name: 'Food', icon: '🍔', color: '#ff9800' },  
  // Continue for all categories...  
];  
```  
  
**Test:** Import and use in a component:  
```typescript  
import { CATEGORY_INFO } from '../models/category.model';  
```  
  
---  
  
## Verification Checklist  
  
Before moving to Phase 2:  
  
- [ ] Angular project created and running  
- [ ] Three model files created (User, Expense, Budget)  
- [ ] HttpClient configured  
- [ ] Global styles applied  
- [ ] App header and footer displaying  
- [ ] Challenge 1: Constants file created  
- [ ] Challenge 2: Utility service implemented  
- [ ] Challenge 3: Category interface created  
- [ ] No compilation errors  
  
---  
  
## Solution Hints  
  
If you're stuck on challenges:  
  
**Challenge 1 - PAYMENT_METHODS:**  
Think about common payment methods in India: UPI (PhonePe, GPay), Cash, Cards, Net Banking  
  
**Challenge 2 - formatDate:**  
Remember: JavaScript months are 0-indexed (January = 0)  
  
**Challenge 2 - formatCurrency:**  
Indian number format: 1,23,456.78 (not 123,456.78)  
  
**Challenge 3 - Colors:**  
Use color codes that match the category theme:  
- Food: Orange (#ff9800)  
- Transport: Blue (#2196f3)  
- Shopping: Pink (#e91e63)  
- Bills: Red (#f44336)  
- Entertainment: Purple (#9c27b0)  
  
---  
  
## What's Next?  
  
In **Phase 2**, you'll:  
- Create Authentication Service  
- Build Login Component  
- Implement session management  
- **Challenge:** Add logout functionality and user profile display  
  
---  
  
## Key Takeaways  
  
1. **Models** define data structure  
2. **Constants** store reusable values  
3. **Utility services** provide helper functions  
4. **Global styles** ensure consistent UI  
5. **Standalone components** are Angular 20's default approach  
  
---  
  
**Complete all challenges before proceeding to Phase 2!** These utilities will be used throughout the project. 🚀  
