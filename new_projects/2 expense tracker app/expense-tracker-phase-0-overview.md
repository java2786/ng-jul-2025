# Expense Tracker - Phase 0: Project Overview and Backend Setup  
  
## Introduction  
  
Welcome to the Expense Tracker application development series! In this project, you'll build a complete expense management system that helps users track their spending, manage budgets, and visualize their financial data.  
  
Think of this application as your personal finance manager - like maintaining a detailed khata (account book) that Indian shopkeepers use, but digital, smart, and with beautiful charts!  
  
---  
  
## What You'll Build  
  
By the end of this project, you'll have a fully functional expense tracker with:  
  
**Core Features:**  
- User authentication (login/logout)  
- Add, edit, and delete expenses  
- Categorize expenses (Food, Transport, Shopping, Bills, etc.)  
- Set monthly budgets for each category  
- View expense statistics and trends  
- Beautiful data visualizations (charts and graphs)  
- Filter expenses by date, category, amount  
- Dashboard with financial overview  
  
**Tech Stack:**  
- **Frontend:** Angular 20 (standalone components)  
- **Backend:** json-server (mock REST API)  
- **Charts:** Chart.js with ng2-charts  
- **Styling:** CSS with gradient themes  
  
---  
  
## Project Structure Overview  
  
```  
expense-tracker/  
│  
├── backend/  
│   └── db.json                    # JSON database  
│  
├── src/  
│   ├── app/  
│   │   ├── models/  
│   │   │   ├── user.model.ts  
│   │   │   ├── expense.model.ts  
│   │   │   └── budget.model.ts  
│   │   │  
│   │   ├── services/  
│   │   │   ├── auth.service.ts  
│   │   │   ├── expense.service.ts  
│   │   │   └── budget.service.ts  
│   │   │  
│   │   ├── components/  
│   │   │   ├── login/  
│   │   │   ├── dashboard/  
│   │   │   ├── expense-list/  
│   │   │   ├── add-expense/  
│   │   │   ├── edit-expense/  
│   │   │   ├── budget-manager/  
│   │   │   └── reports/  
│   │   │  
│   │   ├── app.component.*  
│   │   ├── app.config.ts  
│   │   └── app.routes.ts  
│   │  
│   └── styles.css  
│  
└── package.json  
```  
  
---  
  
## Data Models Overview  
  
### User Model  
```typescript  
interface User {  
  id: number;  
  username: string;  
  password: string;  
  fullName: string;  
  email: string;  
  monthlyIncome: number;  
}  
```  
  
### Expense Model  
```typescript  
interface Expense {  
  id: number;  
  userId: number;  
  amount: number;  
  category: string;  
  description: string;  
  date: string;  
  paymentMethod: string;  
  createdAt: string;  
}  
```  
  
### Budget Model  
```typescript  
interface Budget {  
  id: number;  
  userId: number;  
  category: string;  
  budgetAmount: number;  
  month: string; // Format: "2025-01"  
}  
```  
  
---  
  
## Phase-wise Development Plan  
  
**Phase 0:** Project Overview & Backend Setup (Current)  
- Understand project structure  
- Set up json-server  
- Create sample data  
  
**Phase 1:** Project Foundation  
- Create Angular project  
- Set up models  
- Configure services  
- Add global styles  
  
**Phase 2:** Authentication  
- Create auth service  
- Build login component  
- Implement session management  
  
**Phase 3:** Dashboard  
- Build dashboard layout  
- Show financial summary  
- Display recent expenses  
- **Challenge:** Implement expense statistics calculation  
  
**Phase 4:** Expense Management  
- Create expense list component  
- Add expense form  
- **Challenge:** Implement edit and delete functionality  
  
**Phase 5:** Budget Management  
- Create budget manager component  
- Set category budgets  
- **Challenge:** Calculate budget vs actual spending  
  
**Phase 6:** Data Visualization  
- Install Chart.js  
- Create pie chart for categories  
- Create line chart for spending trends  
- **Challenge:** Add bar chart for budget comparison  
  
**Phase 7:** Advanced Features  
- Date range filters  
- Search functionality  
- Export to CSV  
- **Challenge:** Implement monthly reports  
  
---  
  
## Step 0.1: Install json-server  
  
Open terminal and run:  
  
```bash  
npm install -g json-server  
```  
  
Verify installation:  
```bash  
json-server --version  
```  
  
---  
  
## Step 0.2: Create Backend Folder  
  
```bash  
mkdir expense-tracker-backend  
cd expense-tracker-backend  
```  
  
Create db.json file (use your text editor or command):  
```bash  
# Windows  
type nul > db.json  
  
# Mac/Linux  
touch db.json  
```  
  
---  
  
## Step 0.3: Database Structure  
  
Open `db.json` and add this structure:  
  
```json  
{  
  "users": [  
    {  
      "id": 1,  
      "username": "suresh@expense",  
      "password": "track@123",  
      "fullName": "Suresh Kumar",  
      "email": "suresh.kumar@email.com",  
      "monthlyIncome": 75000  
    }  
  ],  
  "expenses": [  
    {  
      "id": 1,  
      "userId": 1,  
      "amount": 450,  
      "category": "Food",  
      "description": "Lunch at office canteen",  
      "date": "2025-01-15",  
      "paymentMethod": "UPI",  
      "createdAt": "2025-01-15T12:30:00"  
    },  
    {  
      "id": 2,  
      "userId": 1,  
      "amount": 1200,  
      "category": "Transport",  
      "description": "Auto rickshaw - Home to office",  
      "date": "2025-01-15",  
      "paymentMethod": "Cash",  
      "createdAt": "2025-01-15T09:00:00"  
    },  
    {  
      "id": 3,  
      "userId": 1,  
      "amount": 3500,  
      "category": "Shopping",  
      "description": "Clothes from Flipkart",  
      "date": "2025-01-14",  
      "paymentMethod": "Credit Card",  
      "createdAt": "2025-01-14T19:45:00"  
    },  
    {  
      "id": 4,  
      "userId": 1,  
      "amount": 2500,  
      "category": "Bills",  
      "description": "Electricity bill payment",  
      "date": "2025-01-10",  
      "paymentMethod": "Net Banking",  
      "createdAt": "2025-01-10T16:20:00"  
    },  
    {  
      "id": 5,  
      "userId": 1,  
      "amount": 800,  
      "category": "Entertainment",  
      "description": "Movie tickets at PVR",  
      "date": "2025-01-12",  
      "paymentMethod": "UPI",  
      "createdAt": "2025-01-12T20:15:00"  
    }  
  ],  
  "budgets": [  
    {  
      "id": 1,  
      "userId": 1,  
      "category": "Food",  
      "budgetAmount": 8000,  
      "month": "2025-01"  
    },  
    {  
      "id": 2,  
      "userId": 1,  
      "category": "Transport",  
      "budgetAmount": 5000,  
      "month": "2025-01"  
    },  
    {  
      "id": 3,  
      "userId": 1,  
      "category": "Shopping",  
      "budgetAmount": 10000,  
      "month": "2025-01"  
    },  
    {  
      "id": 4,  
      "userId": 1,  
      "category": "Bills",  
      "budgetAmount": 6000,  
      "month": "2025-01"  
    },  
    {  
      "id": 5,  
      "userId": 1,  
      "category": "Entertainment",  
      "budgetAmount": 3000,  
      "month": "2025-01"  
    }  
  ]  
}  
```  
  
---  
  
## Understanding the Data  
  
**Users:**  
- Login credentials for Suresh Kumar  
- Monthly income: ₹75,000  
  
**Expenses:**  
- 5 sample expenses across different categories  
- Common Indian payment methods (UPI, Cash, Credit Card)  
- Realistic descriptions  
  
**Budgets:**  
- Monthly budget limits for each category  
- Total budget: ₹32,000 out of ₹75,000 income  
  
**Categories Used:**  
- Food (₹8,000 budget)  
- Transport (₹5,000 budget)  
- Shopping (₹10,000 budget)  
- Bills (₹6,000 budget)  
- Entertainment (₹3,000 budget)  
  
---  
  
## Step 0.4: Start json-server  
  
Run in your backend folder:  
  
```bash  
json-server --watch db.json --port 3000  
```  
  
You should see:  
```  
Resources  
http://localhost:3000/users  
http://localhost:3000/expenses  
http://localhost:3000/budgets  
```  
  
Keep this terminal running!  
  
---  
  
## Step 0.5: Test API Endpoints  
  
Open new terminal or browser:  
  
**Get all expenses:**  
```bash  
curl http://localhost:3000/expenses  
```  
  
**Get expenses by user:**  
```bash  
curl http://localhost:3000/expenses?userId=1  
```  
  
**Get expenses by category:**  
```bash  
curl http://localhost:3000/expenses?category=Food  
```  
  
**Get budgets for a month:**  
```bash  
curl http://localhost:3000/budgets?month=2025-01  
```  
  
---  
  
## Available API Operations  
  
| Method | Endpoint | Purpose |  
|--------|----------|---------|  
| GET | /expenses | Get all expenses |  
| GET | /expenses?userId=1 | Get user expenses |  
| GET | /expenses?category=Food | Filter by category |  
| GET | /expenses?date=2025-01-15 | Filter by date |  
| POST | /expenses | Create expense |  
| PUT | /expenses/:id | Update expense |  
| DELETE | /expenses/:id | Delete expense |  
| GET | /budgets | Get all budgets |  
| GET | /budgets?userId=1&month=2025-01 | Get user's monthly budgets |  
| POST | /budgets | Create budget |  
| PUT | /budgets/:id | Update budget |  
  
---  
  
## Key Learning Objectives  
  
By completing this project, you'll master:  
  
**Angular Concepts:**  
- Component architecture  
- Services and dependency injection  
- Routing and navigation  
- Forms (reactive and template-driven)  
- HTTP client and API communication  
- RxJS observables  
- Data binding  
- Lifecycle hooks  
  
**Advanced Features:**  
- Data visualization with Chart.js  
- Date handling and formatting  
- Filtering and searching  
- Calculations and aggregations  
- Local storage management  
- State management patterns  
  
**Real-world Skills:**  
- CRUD operations  
- User authentication  
- Form validation  
- Error handling  
- Responsive design  
- Budget tracking logic  
  
---  
  
## Challenge Approach  
  
Each phase will provide:  
  
**✓ What we give you:**  
- Complete explanation of concepts  
- Core functionality implementation  
- Example code for main features  
  
**✓ What you'll implement (Challenges):**  
- Additional features marked as "Challenge"  
- Similar functionality you can build yourself  
- Hints and guidance provided  
- Opportunity to apply what you learned  
  
**Example:**  
- We'll show: How to add an expense  
- You'll build: Edit and delete functionality  
- Why: You'll learn by doing, not just copying!  
  
---  
  
## Verification Checklist  
  
Before moving to Phase 1:  
  
- [ ] json-server installed globally  
- [ ] Backend folder created  
- [ ] db.json file created with sample data  
- [ ] json-server running on port 3000  
- [ ] Can access http://localhost:3000/expenses in browser  
- [ ] Test endpoints return correct data  
- [ ] Understand data models (User, Expense, Budget)  
  
---  
  
## What's Next?  
  
In **Phase 1**, you'll:  
- Create Angular 20 project  
- Set up project structure  
- Create model files  
- Configure HttpClient  
- Add global styles with financial theme (green/blue)  
- **Challenge:** Create a utility service for date formatting  
  
---  
  
## Real-world Connection  
  
This Expense Tracker mirrors how Indians manage money:  
  
**Traditional Method:**  
- Khata book for daily expenses  
- Monthly budgets in mind  
- Categories (ghar kharcha, bazaar, bills)  
  
**Our Digital Solution:**  
- Digital expense recording  
- Automatic budget tracking  
- Visual charts for better understanding  
- History and trends analysis  
  
Just like how shopkeepers moved from physical khata to digital billing, you're building a personal finance tool for the digital age!  
  
---  
  
## Tips for Success  
  
1. **Complete each phase fully** before moving to next  
2. **Attempt challenges yourself** before looking at solutions  
3. **Ask questions** if concepts are unclear  
4. **Experiment** with the code - break things and fix them!  
5. **Keep json-server running** during development  
6. **Test frequently** after each implementation  
  
---  
  
**Ready to start building? Let's move to Phase 1 where we'll create the Angular foundation!** 🚀  
  
---  
  
**Note:** Each phase document will have a similar structure with explanations, partial code, and challenges for you to complete. This hands-on approach ensures you truly understand Angular concepts rather than just copying code!  
