# RxJS in Angular - Practical Real-Time Usage Guide  
  
## What is RxJS?  
  
RxJS (Reactive Extensions for JavaScript) is a library for handling asynchronous events and data streams in Angular. Think of it as a way to work with data that arrives over time - like user clicks, API responses, or timer events.  
  
**Simple Analogy:** Imagine a water pipe. RxJS is like managing the flow of water through that pipe - you can control when it flows, filter it, transform it, and decide what happens when water arrives.  
  
---  
  
## Core Concepts  
  
### 1. Observable  
A stream of data that emits values over time.  
  
**Real-Time Example:** Think of Netflix - videos stream to you over time, not all at once.  
  
### 2. Observer  
The code that listens to the Observable and reacts when data arrives.  
  
**Real-Time Example:** You watching Netflix - you react to what you see on screen.  
  
### 3. Subscription  
The connection between Observable and Observer. Like turning on the TV.  
  
### 4. Operators  
Functions that transform or filter the data stream.  
  
**Real-Time Example:** Adjusting volume, brightness, or skipping ads on Netflix.  
  
---  
  
## Basic Pattern  
  
```typescript  
// Create Observable (data source)  
observable$  
  // Transform data (operators)  
  .pipe(  
    operator1(),  
    operator2()  
  )  
  // Subscribe to receive data (observer)  
  .subscribe({  
    next: (data) => { /* handle data */ },  
    error: (err) => { /* handle error */ },  
    complete: () => { /* handle completion */ }  
  });  
```  
  
---  
  
## Real-Time Scenario 1: Search Feature (Flipkart Product Search)  
  
**Problem:** User types in search box. We want to search only after they stop typing to avoid too many API calls.  
  
```typescript  
import { Component } from '@angular/core';  
import { FormControl, ReactiveFormsModule } from '@angular/forms';  
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-product-search',  
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule],  
  template: `  
    <h2>Flipkart Product Search</h2>  
    <input [formControl]="searchControl" placeholder="Search products...">  
      
    <div *ngIf="isSearching">Searching...</div>  
      
    <div *ngFor="let result of searchResults">  
      {{ result }}  
    </div>  
  `  
})  
export class ProductSearchComponent {  
  searchControl = new FormControl('');  
  searchResults: string[] = [];  
  isSearching = false;  
  
  ngOnInit() {  
    // Observable from form control  
    this.searchControl.valueChanges  
      .pipe(  
        debounceTime(500),           // Wait 500ms after user stops typing  
        distinctUntilChanged()        // Only if value actually changed  
      )  
      .subscribe(searchTerm => {  
        if (searchTerm) {  
          this.isSearching = true;  
          this.performSearch(searchTerm);  
        }  
      });  
  }  
  
  performSearch(term: string) {  
    // Simulate API call  
    console.log('Searching for:', term);  
    setTimeout(() => {  
      this.searchResults = [`${term} - Laptop`, `${term} - Mobile`, `${term} - Tablet`];  
      this.isSearching = false;  
    }, 1000);  
  }  
}  
```  
  
**What's Happening:**  
- `valueChanges`: Creates Observable that emits every time user types  
- `debounceTime(500)`: Waits 500ms after user stops typing  
- `distinctUntilChanged()`: Only emits if value is different from last time  
- `subscribe()`: Executes search when conditions are met  
  
**Real Benefit:** Instead of making 10 API calls for "laptop", we make only 1 call after user finishes typing.  
  
---  
  
## Real-Time Scenario 2: Railway Ticket Availability Checker  
  
**Problem:** Check ticket availability every 5 seconds until tickets become available.  
  
```typescript  
import { Component, OnDestroy } from '@angular/core';  
import { interval, Subscription } from 'rxjs';  
import { takeWhile } from 'rxjs/operators';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-ticket-checker',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>Train Ticket Availability - Chennai Express</h2>  
    <p>Checking availability...</p>  
    <p>Status: {{ status }}</p>  
    <p>Checked: {{ checkCount }} times</p>  
    <button (click)="startChecking()" [disabled]="isChecking">  
      Start Checking  
    </button>  
    <button (click)="stopChecking()" [disabled]="!isChecking">  
      Stop Checking  
    </button>  
  `  
})  
export class TicketCheckerComponent implements OnDestroy {  
  status = 'Not started';  
  checkCount = 0;  
  isChecking = false;  
  private subscription?: Subscription;  
  
  startChecking() {  
    this.isChecking = true;  
    this.checkCount = 0;  
      
    // Check every 5 seconds  
    this.subscription = interval(5000)  
      .pipe(  
        takeWhile(() => this.isChecking)  // Stop when isChecking becomes false  
      )  
      .subscribe(() => {  
        this.checkCount++;  
        this.checkAvailability();  
      });  
  }  
  
  checkAvailability() {  
    // Simulate API check  
    const isAvailable = Math.random() > 0.7;  // 30% chance tickets are available  
      
    if (isAvailable) {  
      this.status = 'Tickets Available! Book now!';  
      this.stopChecking();  
    } else {  
      this.status = `Not available yet (Check ${this.checkCount})`;  
    }  
  }  
  
  stopChecking() {  
    this.isChecking = false;  
    this.subscription?.unsubscribe();  
  }  
  
  ngOnDestroy() {  
    // Always clean up subscriptions  
    this.subscription?.unsubscribe();  
  }  
}  
```  
  
**What's Happening:**  
- `interval(5000)`: Creates Observable that emits every 5 seconds  
- `takeWhile()`: Continues emitting while condition is true  
- `subscribe()`: Checks availability each time  
- `unsubscribe()`: Stops the checking (prevents memory leaks)  
  
**Real Benefit:** Automatic polling without complex timer management.  
  
---  
  
## Real-Time Scenario 3: LIC Premium Calculator with Multiple Inputs  
  
**Problem:** Calculate premium when user changes any input (age, amount, tenure). Need to combine all inputs.  
  
```typescript  
import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';  
import { combineLatest } from 'rxjs';  
import { map, startWith } from 'rxjs/operators';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-premium-calculator',  
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule],  
  template: `  
    <h2>LIC Premium Calculator</h2>  
    <form [formGroup]="calculatorForm">  
      <div>  
        <label>Age:</label>  
        <input type="number" formControlName="age" placeholder="Enter age">  
      </div>  
        
      <div>  
        <label>Sum Assured (₹):</label>  
        <input type="number" formControlName="amount" placeholder="Enter amount">  
      </div>  
        
      <div>  
        <label>Tenure (years):</label>  
        <input type="number" formControlName="tenure" placeholder="Enter tenure">  
      </div>  
    </form>  
      
    <div *ngIf="premium$ | async as premium">  
      <h3>Annual Premium: {{ premium | currency:'INR' }}</h3>  
    </div>  
  `  
})  
export class PremiumCalculatorComponent {  
  calculatorForm: FormGroup;  
  premium$;  
  
  constructor(private fb: FormBuilder) {  
    this.calculatorForm = this.fb.group({  
      age: [30],  
      amount: [500000],  
      tenure: [20]  
    });  
  
    // Combine all form value changes  
    this.premium$ = combineLatest([  
      this.calculatorForm.get('age')!.valueChanges.pipe(startWith(30)),  
      this.calculatorForm.get('amount')!.valueChanges.pipe(startWith(500000)),  
      this.calculatorForm.get('tenure')!.valueChanges.pipe(startWith(20))  
    ]).pipe(  
      map(([age, amount, tenure]) => {  
        // Simple premium calculation formula  
        const baseRate = 0.01;  
        const ageFactor = age > 40 ? 1.5 : 1;  
        const tenureFactor = tenure > 15 ? 0.9 : 1;  
          
        return (amount * baseRate * ageFactor * tenureFactor);  
      })  
    );  
  }  
}  
```  
  
**What's Happening:**  
- `combineLatest()`: Waits for all Observables and combines their latest values  
- `startWith()`: Provides initial value  
- `map()`: Transforms combined values into premium calculation  
- `async` pipe: Automatically subscribes and displays result  
  
**Real Benefit:** Real-time calculation as user types, without manual event handling.  
  
---  
  
## Real-Time Scenario 4: Indian Railways Live Train Status  
  
**Problem:** Fetch train status from API and handle loading/error states.  
  
```typescript  
import { Component } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { catchError, map, tap } from 'rxjs/operators';  
import { of } from 'rxjs';  
import { CommonModule } from '@angular/common';  
  
interface TrainStatus {  
  trainNumber: string;  
  trainName: string;  
  currentLocation: string;  
  expectedArrival: string;  
  delay: number;  
}  
  
@Component({  
  selector: 'app-train-status',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>Live Train Status - Indian Railways</h2>  
      
    <button (click)="checkStatus()">Check Status</button>  
      
    <div *ngIf="loading">Loading train status...</div>  
      
    <div *ngIf="error" style="color: red;">  
      Error: {{ error }}  
    </div>  
      
    <div *ngIf="trainStatus">  
      <h3>{{ trainStatus.trainName }} ({{ trainStatus.trainNumber }})</h3>  
      <p>Current Location: {{ trainStatus.currentLocation }}</p>  
      <p>Expected Arrival: {{ trainStatus.expectedArrival }}</p>  
      <p [style.color]="trainStatus.delay > 0 ? 'red' : 'green'">  
        Delay: {{ trainStatus.delay }} minutes  
      </p>  
    </div>  
  `  
})  
export class TrainStatusComponent {  
  trainStatus?: TrainStatus;  
  loading = false;  
  error = '';  
  
  constructor(private http: HttpClient) {}  
  
  checkStatus() {  
    this.loading = true;  
    this.error = '';  
      
    // Simulate API call (replace with real API)  
    this.http.get<TrainStatus>('https://api.example.com/train/12163')  
      .pipe(  
        tap(() => console.log('API call made')),  
        map(response => {  
          // Transform API response if needed  
          return response;  
        }),  
        catchError(err => {  
          // Handle error  
          this.error = 'Failed to fetch train status. Please try again.';  
          console.error('Error:', err);  
          return of(null);  // Return empty observable  
        })  
      )  
      .subscribe(status => {  
        this.loading = false;  
        if (status) {  
          this.trainStatus = status;  
        }  
      });  
  }  
}  
```  
  
**What's Happening:**  
- `tap()`: Performs side effect (logging) without changing data  
- `map()`: Transforms response data  
- `catchError()`: Handles errors gracefully  
- `of()`: Creates Observable from static value  
  
**Real Benefit:** Clean error handling and data transformation in one pipeline.  
  
---  
  
## Common RxJS Operators - Quick Reference  
  
### Transformation Operators  
  
```typescript  
// map - Transform each value  
of(1, 2, 3).pipe(  
  map(x => x * 10)  
).subscribe(console.log);  // 10, 20, 30  
  
// Example: Convert price from dollars to rupees  
priceInDollars$.pipe(  
  map(price => price * 83)  
)  
```  
  
### Filtering Operators  
  
```typescript  
// filter - Only emit values that pass condition  
of(1, 2, 3, 4, 5).pipe(  
  filter(x => x > 2)  
).subscribe(console.log);  // 3, 4, 5  
  
// Example: Show only available products  
products$.pipe(  
  filter(product => product.inStock)  
)  
```  
  
### Time-Based Operators  
  
```typescript  
// debounceTime - Wait before emitting  
searchInput$.pipe(  
  debounceTime(300)  // Wait 300ms after user stops typing  
)  
  
// throttleTime - Emit first, then ignore for specified time  
buttonClicks$.pipe(  
  throttleTime(1000)  // Prevent button spam - only 1 click per second  
)  
```  
  
### Combination Operators  
  
```typescript  
// combineLatest - Combine latest values from multiple Observables  
combineLatest([firstName$, lastName$]).pipe(  
  map(([first, last]) => `${first} ${last}`)  
)  
  
// merge - Merge multiple Observables into one  
merge(clickStream$, touchStream$).subscribe(handleEvent);  
```  
  
---  
  
## Best Practices  
  
### 1. Always Unsubscribe  
  
```typescript  
export class MyComponent implements OnDestroy {  
  private subscription?: Subscription;  
    
  ngOnInit() {  
    this.subscription = someObservable$.subscribe(data => {  
      // Handle data  
    });  
  }  
    
  ngOnDestroy() {  
    this.subscription?.unsubscribe();  // Prevent memory leaks  
  }  
}  
```  
  
### 2. Use Async Pipe (Automatic Unsubscribe)  
  
```typescript  
// In component  
users$ = this.http.get<User[]>('/api/users');  
  
// In template  
<div *ngFor="let user of users$ | async">  
  {{ user.name }}  
</div>  
```  
  
### 3. Handle Errors  
  
```typescript  
this.http.get('/api/data')  
  .pipe(  
    catchError(error => {  
      console.error('Error:', error);  
      return of([]);  // Return empty array on error  
    })  
  )  
  .subscribe(data => {  
    // Handle data  
  });  
```  
  
---  
  
## Quick Practice Exercise  
  
**Task:** Create a simple counter that:  
1. Increments every second  
2. Shows current count  
3. Stops at 10  
4. Has start/stop buttons  
  
```typescript  
import { Component } from '@angular/core';  
import { interval, Subscription } from 'rxjs';  
import { take } from 'rxjs/operators';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-counter',  
  standalone: true,  
  imports: [CommonModule],  
  template: `  
    <h2>Counter: {{ count }}</h2>  
    <button (click)="start()" [disabled]="isRunning">Start</button>  
    <button (click)="stop()" [disabled]="!isRunning">Stop</button>  
    <button (click)="reset()">Reset</button>  
  `  
})  
export class CounterComponent {  
  count = 0;  
  isRunning = false;  
  private subscription?: Subscription;  
    
  start() {  
    this.isRunning = true;  
    this.subscription = interval(1000)  // Emit every 1 second  
      .pipe(  
        take(10)  // Stop after 10 emissions  
      )  
      .subscribe({  
        next: (value) => {  
          this.count = value + 1;  
        },  
        complete: () => {  
          this.isRunning = false;  
          alert('Counter completed!');  
        }  
      });  
  }  
    
  stop() {  
    this.subscription?.unsubscribe();  
    this.isRunning = false;  
  }  
    
  reset() {  
    this.stop();  
    this.count = 0;  
  }  
}  
```  
  
---  
  
## Summary  
  
**Key Takeaways:**  
  
1. **Observable** = Data stream (like a pipe with flowing water)  
2. **Operators** = Transform/filter data (like water filters)  
3. **Subscribe** = Start receiving data (turn on the tap)  
4. **Unsubscribe** = Stop receiving data (turn off the tap)  
  
**Most Used in Real Projects:**  
- `debounceTime()` - Search features  
- `map()` - Transform API responses  
- `catchError()` - Handle API errors  
- `combineLatest()` - Multiple form inputs  
- `interval()` - Polling/auto-refresh  
- `filter()` - Conditional data flow  
  
**Remember:**  
- RxJS makes asynchronous code easier to manage  
- Think in terms of data streams, not individual events  
- Always clean up subscriptions to prevent memory leaks  
- Use async pipe in templates when possible  
  
---  
  
**Next Steps:**  
1. Practice the 4 real-time scenarios above  
2. Complete the counter exercise  
3. Try combining operators (debounceTime + map)  
4. Build a simple search feature for your project  
  
**Happy Coding!**