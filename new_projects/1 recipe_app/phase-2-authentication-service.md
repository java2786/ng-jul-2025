# RecipeBook - Phase 2: Authentication Service  
  
## Introduction  
  
Welcome to Phase 2! Now that our foundation is ready, we need to implement authentication. In this phase, we'll create an Authentication Service that handles user login, stores user information, and manages authentication state.  
  
Think of the Authentication Service as a security guard at a restaurant. The guard checks if you have a reservation (valid credentials), lets you in if everything is correct, and remembers you're inside so you can access all areas of the restaurant!  
  
---  
  
## What You'll Learn in This Phase  
  
- Creating Angular services using CLI  
- Making HTTP requests to backend API  
- Using RxJS Observables for async operations  
- Storing data in browser's localStorage  
- Managing authentication state  
- Understanding query parameters in HTTP requests  
  
---  
  
## Prerequisites  
  
- Completed Phase 0 and Phase 1  
- json-server running on port 3000  
- Angular dev server running on port 4200  
- Basic understanding of HTTP and APIs  
  
---  
  
## Understanding Authentication Flow  
  
Before we write code, let's understand how authentication works in our app:  
  
**Step-by-Step Authentication Flow:**  
  
1. User enters username and password  
2. App sends these credentials to backend  
3. Backend checks if user exists with matching credentials  
4. If valid, backend returns user data  
5. App stores user data in localStorage  
6. User can now access protected features  
7. On logout, app clears stored data  
  
**Real-world Example:**  
  
Think of authentication like checking into a hotel:  
1. You provide ID at reception (username/password)  
2. Receptionist verifies your booking (API call to backend)  
3. You receive a room key card (user data stored)  
4. You can now access your room and hotel facilities (protected routes)  
5. At checkout, you return the key card (logout clears data)  
  
---  
  
## Step 2.1: Generate Authentication Service  
  
Open a new terminal (keep ng serve and json-server running) and navigate to your project folder:  
  
```bash  
cd recipe-app  
```  
  
Generate the authentication service:  
  
```bash  
ng generate service services/auth  
```  
  
**What this command does:**  
- Creates a `services` folder inside `src/app/`  
- Creates `auth.service.ts` file  
- Creates `auth.service.spec.ts` file (for testing)  
- Registers the service as injectable  
  
You should see output like:  
  
```  
CREATE src/app/services/auth.service.ts  
CREATE src/app/services/auth.service.spec.ts  
```  
  
---  
  
## Step 2.2: Implement Authentication Service  
  
Open `src/app/services/auth.service.ts` and replace all content with:  
  
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
    // Check if user data exists in localStorage  
    const storedUser = localStorage.getItem('currentUser');  
    this.currentUserSubject = new BehaviorSubject<User | null>(  
      storedUser ? JSON.parse(storedUser) : null  
    );  
    this.currentUser = this.currentUserSubject.asObservable();  
  }  
  
  // Get current user value  
  public get currentUserValue(): User | null {  
    return this.currentUserSubject.value;  
  }  
  
  // Login method  
  login(username: string, password: string): Observable<User> {  
    // Create query parameters  
    const params = new HttpParams()  
      .set('username', username)  
      .set('password', password);  
  
    // Make API call with query parameters  
    return this.http.get<User[]>(this.apiUrl, { params }).pipe(  
      map(users => {  
        if (users && users.length > 0) {  
          const user = users[0];  
          // Store user in localStorage  
          localStorage.setItem('currentUser', JSON.stringify(user));  
          // Update current user subject  
          this.currentUserSubject.next(user);  
          return user;  
        } else {  
          throw new Error('Invalid username or password');  
        }  
      })  
    );  
  }  
  
  // Logout method  
  logout(): void {  
    // Remove user from localStorage  
    localStorage.removeItem('currentUser');  
    // Update current user subject to null  
    this.currentUserSubject.next(null);  
  }  
  
  // Check if user is logged in  
  isLoggedIn(): boolean {  
    return this.currentUserValue !== null;  
  }  
  
  // Get logged in user's full name  
  getUserFullName(): string {  
    return this.currentUserValue?.fullName || 'Guest';  
  }  
}  
```  
  
**Let's break down this code section by section:**  
  
---  
  
## Understanding the Code  
  
### Section 1: Imports  
  
```typescript  
import { Injectable } from '@angular/core';  
import { HttpClient, HttpParams } from '@angular/common/http';  
import { Observable, BehaviorSubject } from 'rxjs';  
import { map } from 'rxjs/operators';  
import { User } from '../models/user.model';  
```  
  
**What each import does:**  
  
- `Injectable` - Marks this class as a service that can be injected  
- `HttpClient` - Used to make HTTP requests  
- `HttpParams` - Used to build URL query parameters  
- `Observable` - Represents a stream of data over time  
- `BehaviorSubject` - Special type of Observable that remembers last value  
- `map` - RxJS operator to transform data  
- `User` - Our user model interface  
  
---  
  
### Section 2: Service Decorator and API Configuration  
  
```typescript  
@Injectable({  
  providedIn: 'root'  
})  
export class AuthService {  
  private apiUrl = 'http://localhost:3000/users';  
```  
  
**Explanation:**  
  
- `@Injectable({ providedIn: 'root' })` - Makes this service available app-wide as a singleton  
- `apiUrl` - Endpoint for user authentication  
  
---  
  
### Section 3: State Management Variables  
  
```typescript  
private currentUserSubject: BehaviorSubject<User | null>;  
public currentUser: Observable<User | null>;  
```  
  
**Understanding BehaviorSubject vs Observable:**  
  
- **BehaviorSubject** - Like a variable that notifies subscribers when it changes  
- **Observable** - Read-only stream that components can subscribe to  
- We expose Observable publicly but keep BehaviorSubject private for control  
  
**Real-world Example:**  
  
Think of BehaviorSubject as a TV broadcaster:  
- The broadcaster (BehaviorSubject) controls what's being aired  
- Multiple TVs (components) can subscribe to watch  
- All TVs show the same content at the same time  
- When broadcaster changes the channel, all TVs update automatically  
  
---  
  
### Section 4: Constructor with localStorage Check  
  
```typescript  
constructor(private http: HttpClient) {  
  const storedUser = localStorage.getItem('currentUser');  
  this.currentUserSubject = new BehaviorSubject<User | null>(  
    storedUser ? JSON.parse(storedUser) : null  
  );  
  this.currentUser = this.currentUserSubject.asObservable();  
}  
```  
  
**What happens here:**  
  
1. Service is created when app starts  
2. Checks localStorage for saved user data  
3. If found, parses JSON string back to User object  
4. Initializes BehaviorSubject with user data (or null)  
5. Creates Observable from BehaviorSubject  
  
**Why is this important?**  
  
When user refreshes the page, we don't want them to be logged out! This code checks if they were previously logged in and restores their session.  
  
---  
  
### Section 5: Get Current User Value  
  
```typescript  
public get currentUserValue(): User | null {  
  return this.currentUserSubject.value;  
}  
```  
  
**What this does:**  
  
Provides synchronous access to current user without subscribing to Observable.  
  
**When to use:**  
  
Use this when you need the current value immediately, like checking if user is logged in before allowing navigation.  
  
---  
  
### Section 6: Login Method  
  
```typescript  
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
```  
  
**Step-by-step breakdown:**  
  
**Step 1:** Create query parameters  
```typescript  
const params = new HttpParams()  
  .set('username', username)  
  .set('password', password);  
```  
  
This creates: `?username=chef@recipes&password=recipe@123`  
  
**Step 2:** Make HTTP GET request  
```typescript  
return this.http.get<User[]>(this.apiUrl, { params })  
```  
  
Full URL becomes: `http://localhost:3000/users?username=chef@recipes&password=recipe@123`  
  
**Step 3:** Transform response using `map` operator  
```typescript  
.pipe(  
  map(users => {  
    // Transformation logic here  
  })  
)  
```  
  
**Step 4:** Check if user exists  
```typescript  
if (users && users.length > 0) {  
  const user = users[0];  
  // User found, proceed with login  
}  
```  
  
**Step 5:** Store user and update state  
```typescript  
localStorage.setItem('currentUser', JSON.stringify(user));  
this.currentUserSubject.next(user);  
return user;  
```  
  
**Step 6:** Handle invalid credentials  
```typescript  
else {  
  throw new Error('Invalid username or password');  
}  
```  
  
**Real-world Example:**  
  
Imagine you're at a restaurant:  
1. You tell the host your name (username/password)  
2. Host checks the reservation list (API call)  
3. If your name is there, you get seated (user data stored)  
4. You're marked as "checked in" (BehaviorSubject updated)  
5. If your name isn't there, host says "No reservation found" (error thrown)  
  
---  
  
### Section 7: Logout Method  
  
```typescript  
logout(): void {  
  localStorage.removeItem('currentUser');  
  this.currentUserSubject.next(null);  
}  
```  
  
**What this does:**  
  
1. Removes user data from localStorage  
2. Updates BehaviorSubject to null  
3. Any components subscribed to `currentUser` will receive null value  
  
---  
  
### Section 8: Helper Methods  
  
```typescript  
isLoggedIn(): boolean {  
  return this.currentUserValue !== null;  
}  
  
getUserFullName(): string {  
  return this.currentUserValue?.fullName || 'Guest';  
}  
```  
  
**isLoggedIn():**  
- Returns `true` if user is logged in  
- Returns `false` if user is null  
  
**getUserFullName():**  
- Returns logged-in user's full name  
- Returns 'Guest' if no user is logged in  
- Uses optional chaining (`?.`) to safely access property  
  
---  
  
## Understanding localStorage  
  
**What is localStorage?**  
  
localStorage is a browser feature that stores data persistently. Data remains even after closing the browser.  
  
**localStorage Methods:**  
  
```typescript  
// Store data  
localStorage.setItem('key', 'value');  
  
// Retrieve data  
const value = localStorage.getItem('key');  
  
// Remove data  
localStorage.removeItem('key');  
  
// Clear all data  
localStorage.clear();  
```  
  
**Important Notes:**  
  
- localStorage only stores strings  
- To store objects, use `JSON.stringify()`  
- To retrieve objects, use `JSON.parse()`  
- Data is specific to the domain (localhost:4200)  
  
**Real-world Example:**  
  
Think of localStorage like a locker at a gym:  
- You store your belongings (data) in the locker  
- The locker stays locked even if you leave the gym (close browser)  
- When you come back, your belongings are still there (data persists)  
- You need your key to access it (same domain)  
  
---  
  
## Testing the Authentication Service  
  
Let's verify our service is working correctly.  
  
### Test 1: Check Service Creation  
  
Open browser console (F12) and go to http://localhost:4200  
  
You shouldn't see any errors. The service is automatically created when the app loads.  
  
### Test 2: Inspect localStorage  
  
In browser console, type:  
  
```javascript  
localStorage.getItem('currentUser')  
```  
  
Should return `null` because we haven't logged in yet.  
  
---  
  
## Common Issues and Troubleshooting  
  
### Issue 1: HttpClient Not Provided Error  
  
**Error:** `NullInjectorError: No provider for HttpClient`  
  
**Solution:**   
  
Make sure you added `provideHttpClient()` in `src/app/app.config.ts` (done in Phase 1).  
  
### Issue 2: CORS Error  
  
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`  
  
**Solution:**  
  
This usually means json-server isn't running. Make sure json-server is running on port 3000:  
  
```bash  
json-server --watch db.json --port 3000  
```  
  
### Issue 3: Import Errors  
  
**Error:** `Cannot find module '../models/user.model'`  
  
**Solution:**  
  
Make sure you created `user.model.ts` in Phase 1. Check the file path is correct.  
  
---  
  
## Verification Checklist  
  
Before moving to Phase 3, verify:  
  
- [ ] `auth.service.ts` file created in `src/app/services/` folder  
- [ ] All imports are correct with no errors  
- [ ] Service has login and logout methods  
- [ ] Service uses HttpClient for API calls  
- [ ] localStorage is used to store user data  
- [ ] BehaviorSubject manages authentication state  
- [ ] No compilation errors in terminal  
- [ ] No errors in browser console  
  
---  
  
## What's Next?  
  
In **Phase 3**, we'll:  
- Create the Login Component  
- Build a beautiful login form with RecipeBook branding  
- Implement form validation  
- Connect the form to our Authentication Service  
- Handle login success and errors  
- Configure routing to redirect after login  
  
---  
  
## Key Takeaways  
  
1. **Services** encapsulate business logic and data access  
2. **HttpClient** is used for making HTTP requests to backend  
3. **HttpParams** builds query strings for API calls  
4. **localStorage** provides persistent storage in the browser  
5. **BehaviorSubject** manages state and notifies subscribers of changes  
6. **Observables** allow components to react to data changes  
7. **RxJS operators** like `map` transform data streams  
  
---  
  
## Practice Exercise  
  
**Challenge:** Add a new method to the AuthService called `getLoggedInUserId()` that returns the current user's ID or 0 if not logged in.  
  
**Solution:**  
  
```typescript  
getLoggedInUserId(): number {  
  return this.currentUserValue?.id || 0;  
}  
```  
  
Add this method inside the `AuthService` class, below the `getUserFullName()` method.  
  
---  
  
## Understanding RxJS Observables (Bonus Explanation)  
  
**What is an Observable?**  
  
An Observable is like a pipe through which data flows over time.  
  
**Simple analogy:**  
  
Imagine a water pipe in your kitchen:  
- The pipe is the Observable  
- Water flowing through it is the data  
- Turning on the tap is subscribing  
- Turning off the tap is unsubscribing  
- The water (data) can flow continuously or in bursts  
  
**In our authentication service:**  
  
```typescript  
// Observable that emits user or null  
public currentUser: Observable<User | null>;  
  
// Components can subscribe to know when user changes  
this.authService.currentUser.subscribe(user => {  
  console.log('User changed:', user);  
});  
```  
  
Whenever we call `this.currentUserSubject.next(user)`, all subscribed components automatically receive the new user value!  
  
---  
  
## Fun Fact  
  
The concept of Observables in Angular comes from ReactiveX (Reactive Extensions), which was originally created by Microsoft! The pattern is so powerful that it's now used in many programming languages including JavaScript, Java, Python, and more.  
  
In our RecipeBook app, we use Observables to make our authentication reactive - when a user logs in or out, all parts of the app that care about the user state automatically update. It's like having waiters in a restaurant who automatically know when a new order is ready in the kitchen, without having to keep checking!  
  
---  
  
**Great job completing Phase 2!** You've created a robust authentication service that handles login, logout, and session persistence. This service will be the backbone of our app's security. Keep all terminals running and proceed to Phase 3 where we'll build the beautiful login interface!  
