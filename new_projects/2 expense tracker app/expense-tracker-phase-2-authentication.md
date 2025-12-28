# Expense Tracker - Phase 2: Authentication System  
  
## Introduction  
  
In this phase, you'll implement the authentication system. We'll create the auth service and login component together, then you'll add logout and user profile features on your own.  
  
---  
  
## What You'll Learn  
  
- Creating authentication services  
- Managing user sessions  
- Building login forms  
- Using localStorage  
- Route protection basics  
  
---  
  
## Step 2.1: Create Auth Service  
  
Generate service:  
```bash  
ng generate service services/auth  
```  
  
Open `src/app/services/auth.service.ts`:  
  
```typescript  
import { Injectable } from '@angular/core';  
import { HttpClient, HttpParams } from '@angular/common/http';  
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
    const params = new HttpParams()  
      .set('username', username)  
      .set('password', password);  
  
    return this.http.get<User[]>(this.apiUrl, { params }).pipe(  
      map(users => {  
        if (users && users.length > 0) {  
          const user = users[0];  
          localStorage.setItem('currentUser', JSON.stringify(user));  
          this.currentUserSubject.next(user);  
          return user;  
        } else {  
          throw new Error('Invalid username or password');  
        }  
      })  
    );  
  }  
  
  // TODO: Implement logout method  
  // Should:  
  // 1. Remove user from localStorage  
  // 2. Update currentUserSubject to null  
    
  // TODO: Implement isLoggedIn method  
  // Should return true if user is logged in  
    
  // TODO: Implement getUserId method  
  // Should return current user's ID or 0 if not logged in  
}  
```  
  
---  
  
## 🎯 Challenge 1: Complete Auth Service  
  
**Your Tasks:**  
  
1. **Implement logout() method:**  
```typescript  
logout(): void {  
  // Remove from localStorage  
  // Update BehaviorSubject to null  
}  
```  
  
2. **Implement isLoggedIn() method:**  
```typescript  
isLoggedIn(): boolean {  
  // Return true if currentUserValue is not null  
}  
```  
  
3. **Implement getUserId() method:**  
```typescript  
getUserId(): number {  
  // Return user ID or 0  
}  
```  
  
**Test your implementation:**  
```typescript  
// In any component  
constructor(private authService: AuthService) {  
  console.log('Is logged in?', this.authService.isLoggedIn());  
}  
```  
  
---  
  
## Step 2.2: Create Login Component  
  
Generate component:  
```bash  
ng generate component components/login  
```  
  
Open `src/app/components/login/login.ts`:  
  
```typescript  
import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
import { AuthService } from '../../services/auth.service';  
  
@Component({  
  selector: 'app-login',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.html',  
  styleUrl: './login.css'  
})  
export class LoginComponent {  
  username: string = '';  
  password: string = '';  
  errorMessage: string = '';  
  isLoading: boolean = false;  
  
  constructor(  
    private authService: AuthService,  
    private router: Router  
  ) {  
    // Redirect if already logged in  
    if (this.authService.isLoggedIn()) {  
      this.router.navigate(['/dashboard']);  
    }  
  }  
  
  onLogin(): void {  
    if (!this.username || !this.password) {  
      this.errorMessage = 'Please enter both username and password';  
      return;  
    }  
  
    this.isLoading = true;  
    this.authService.login(this.username, this.password).subscribe({  
      next: (user) => {  
        this.router.navigate(['/dashboard']);  
      },  
      error: (error) => {  
        this.errorMessage = error.message;  
        this.isLoading = false;  
      }  
    });  
  }  
}  
```  
  
---  
  
## Step 2.3: Login Component Template  
  
Open `src/app/components/login/login.html`:  
  
```html  
<div class="login-container">  
  <div class="login-card">  
    <div class="login-header">  
      <div class="login-icon">💰</div>  
      <h2>Welcome Back!</h2>  
      <p>Login to track your expenses</p>  
    </div>  
  
    <div class="alert alert-error" *ngIf="errorMessage">  
      {{ errorMessage }}  
    </div>  
  
    <form (ngSubmit)="onLogin()">  
      <div class="form-group">  
        <label for="username">Username</label>  
        <input  
          type="text"  
          id="username"  
          name="username"  
          class="form-control"  
          [(ngModel)]="username"  
          placeholder="Enter username"  
        />  
      </div>  
  
      <div class="form-group">  
        <label for="password">Password</label>  
        <input  
          type="password"  
          id="password"  
          name="password"  
          class="form-control"  
          [(ngModel)]="password"  
          placeholder="Enter password"  
        />  
      </div>  
  
      <div class="demo-credentials">  
        <strong>Demo Credentials:</strong><br>  
        Username: suresh@expense<br>  
        Password: track@123  
      </div>  
  
      <button type="submit" class="btn btn-primary btn-full" [disabled]="isLoading">  
        <span *ngIf="!isLoading">Login</span>  
        <span *ngIf="isLoading">Logging in...</span>  
      </button>  
    </form>  
  </div>  
</div>  
```  
  
---  
  
## Step 2.4: Login Component Styles  
  
Open `src/app/components/login/login.css`:  
  
```css  
.login-container {  
  min-height: calc(100vh - 200px);  
  display: flex;  
  justify-content: center;  
  align-items: center;  
}  
  
.login-card {  
  background: white;  
  border-radius: 16px;  
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);  
  padding: 40px;  
  width: 100%;  
  max-width: 450px;  
}  
  
.login-header {  
  text-align: center;  
  margin-bottom: 30px;  
}  
  
.login-icon {  
  font-size: 60px;  
  margin-bottom: 20px;  
}  
  
.login-header h2 {  
  color: #4caf50;  
  font-size: 28px;  
  margin-bottom: 10px;  
}  
  
.demo-credentials {  
  background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);  
  padding: 16px;  
  border-radius: 8px;  
  margin-bottom: 24px;  
  border-left: 4px solid #4caf50;  
  font-size: 14px;  
}  
  
.btn-full {  
  width: 100%;  
}  
```  
  
---  
  
## Step 2.5: Configure Routes  
  
Open `src/app/app.routes.ts`:  
  
```typescript  
import { Routes } from '@angular/router';  
import { LoginComponent } from './components/login/login';  
  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  // More routes will be added later  
  { path: '**', redirectTo: '/login' }  
];  
```  
  
---  
  
## Step 2.6: Test Login  
  
1. Run application: `ng serve`  
2. Navigate to http://localhost:4200  
3. Try logging in with demo credentials  
4. Check browser console for any errors  
  
---  
  
## 🎯 Challenge 2: Add User Profile Display  
  
**Task:** Create a component that shows logged-in user information.  
  
**File:** Generate component: `ng generate component components/user-profile`  
  
**What to implement in TypeScript:**  
  
```typescript  
export class UserProfileComponent {  
  user: User | null = null;  
  
  constructor(private authService: AuthService) {  
    // TODO: Get current user from authService  
  }  
  
  // TODO: Add method to format monthly income  
  // Should return formatted currency like ₹75,000  
}  
```  
  
**What to implement in HTML:**  
  
```html  
<div class="user-profile" *ngIf="user">  
  <!-- Display user full name -->  
  <!-- Display monthly income (formatted) -->  
  <!-- Display email -->  
</div>  
```  
  
**Hint:** Use the UtilityService's formatCurrency method you created in Phase 1!  
  
---  
  
## 🎯 Challenge 3: Create Header Component  
  
**Task:** Create a reusable header component that shows user info and logout button.  
  
**Generate:**  
```bash  
ng generate component components/header  
```  
  
**Requirements:**  
  
1. Show user name on the right side  
2. Add logout button  
3. Call authService.logout() when clicked  
4. Navigate to /login after logout  
5. Style it nicely with green theme  
  
**Template Structure:**  
  
```html  
<header class="app-header">  
  <div class="container">  
    <div class="header-content">  
      <div class="logo">💰 Expense Tracker</div>  
      <div class="user-section">  
        <!-- Show user name -->  
        <!-- Logout button -->  
      </div>  
    </div>  
  </div>  
</header>  
```  
  
**Styling Hints:**  
  
```css  
.header-content {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
}  
  
.user-section {  
  display: flex;  
  align-items: center;  
  gap: 15px;  
}  
```  
  
---  
  
## 🎯 Challenge 4: Create Auth Guard  
  
**Task:** Create a route guard to protect routes that require authentication.  
  
**Generate:**  
```bash  
ng generate guard guards/auth  
```  
  
**Select:** CanActivate  
  
**What to implement:**  
  
```typescript  
import { inject } from '@angular/core';  
import { Router } from '@angular/router';  
import { AuthService } from '../services/auth.service';  
  
export const authGuard = () => {  
  const authService = inject(AuthService);  
  const router = inject(Router);  
  
  // TODO: Check if user is logged in  
  // If yes, return true  
  // If no, navigate to /login and return false  
};  
```  
  
**How to use:**  
  
```typescript  
// In app.routes.ts  
{  
  path: 'dashboard',  
  component: DashboardComponent,  
  canActivate: [authGuard]  
}  
```  
  
---  
  
## Testing Your Implementation  
  
**Test Logout:**  
1. Login successfully  
2. Click logout button (from Challenge 3)  
3. Should redirect to login page  
4. Check localStorage is cleared (Browser DevTools → Application → Local Storage)  
  
**Test Auth Guard:**  
1. Logout completely  
2. Try to manually navigate to http://localhost:4200/dashboard  
3. Should redirect to login  
4. Login and navigate again  
5. Should show dashboard  
  
**Test User Profile:**  
1. Login  
2. User profile component should show:  
   - Suresh Kumar  
   - ₹75,000.00  
   - suresh.kumar@email.com  
  
---  
  
## Common Issues & Solutions  
  
**Issue 1: Login not working**  
- Check json-server is running  
- Verify credentials match db.json  
- Check browser console for errors  
  
**Issue 2: localStorage not persisting**  
- Check browser privacy settings  
- Try clearing cache and cookies  
  
**Issue 3: Auth guard not working**  
- Verify guard is added to route configuration  
- Check guard is returning boolean  
  
---  
  
## Verification Checklist  
  
- [ ] Auth service created with login method  
- [ ] Challenge 1: logout, isLoggedIn, getUserId implemented  
- [ ] Login component displays correctly  
- [ ] Can login with demo credentials  
- [ ] Login redirects to dashboard (even if blank)  
- [ ] Challenge 2: User profile component created  
- [ ] Challenge 3: Header with logout created  
- [ ] Challenge 4: Auth guard implemented  
- [ ] Logout clears localStorage  
- [ ] Auth guard prevents unauthorized access  
  
---  
  
## Solution Hints  
  
**logout() method:**  
```typescript  
logout(): void {  
  localStorage.removeItem('currentUser');  
  this.currentUserSubject.next(null);  
}  
```  
  
**authGuard:**  
```typescript  
if (authService.isLoggedIn()) {  
  return true;  
}  
router.navigate(['/login']);  
return false;  
```  
  
**User Profile:**  
```typescript  
constructor(private authService: AuthService, private utilityService: UtilityService) {  
  this.user = this.authService.currentUserValue;  
}  
  
getFormattedIncome(): string {  
  return this.utilityService.formatCurrency(this.user?.monthlyIncome || 0);  
}  
```  
  
---  
  
## What's Next?  
  
In **Phase 3**, you'll:  
- Create Dashboard Component  
- Show expense summary  
- Display recent expenses  
- Calculate total spending  
- **Challenge:** Implement expense statistics  
  
---  
  
## Key Concepts Learned  
  
1. **BehaviorSubject** manages authentication state  
2. **localStorage** persists user session  
3. **Guards** protect routes  
4. **Observables** handle async authentication  
5. **Service pattern** centralizes auth logic  
  
---  
  
**Complete all challenges and verify everything works before moving to Phase 3!** 🎯  
