# Angular Lifecycle Hooks & Interceptors - Quick Reference  
  
## Angular Lifecycle Hooks  
  
Lifecycle hooks are special methods that Angular calls at specific moments in a component's life. They help you perform actions at the right time.  
  
### Component Lifecycle Order  
  
```  
Constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit   
→ ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy  
```  
  
---  
  
### 1. constructor()  
  
**When:** Before any lifecycle hook, when the component is created  
  
**Purpose:** Initialize class members, inject dependencies  
  
**TypeScript:**  
```typescript  
export class EmployeeComponent {  
  employeeName: string = '';  
    
  constructor(private employeeService: EmployeeService) {  
    console.log('1. Constructor called');  
    // Only dependency injection, no DOM access  
  }  
}  
```  
  
**HTML:**  
```html  
<div class="employee-card">  
  <!-- Don't try to access DOM elements in constructor -->  
  <h3>Employee: {{ employeeName }}</h3>  
</div>  
```  
  
**Real Use Case:** Injecting services like EmployeeService, Router, or FormBuilder  
  
**Important:** Constructor is NOT an Angular hook - it's a TypeScript feature  
  
---  
  
### 2. ngOnChanges()  
  
**When:** Called before ngOnInit and whenever input properties change  
  
**Purpose:** React to changes in input properties  
  
**TypeScript:**  
```typescript  
// Parent Component  
export class EmployeeListComponent {  
  selectedEmployee: Employee = {  
    id: 1,  
    name: 'Suresh Kumar',  
    salary: 85000,  
    department: 'Engineering'  
  };  
    
  updateEmployee() {  
    this.selectedEmployee = {  
      ...this.selectedEmployee,  
      salary: 95000  
    };  
  }  
}  
  
// Child Component  
export class EmployeeCardComponent implements OnChanges {  
  @Input() employee!: Employee;  
  salaryStatus: string = '';  
  
  ngOnChanges(changes: SimpleChanges) {  
    console.log('2. ngOnChanges called');  
      
    if (changes['employee']) {  
      const current = changes['employee'].currentValue;  
      const previous = changes['employee'].previousValue;  
        
      console.log('Previous:', previous);  
      console.log('Current:', current);  
        
      // Calculate salary status when input changes  
      if (current && current.salary > 80000) {  
        this.salaryStatus = 'High Salary';  
      } else {  
        this.salaryStatus = 'Standard Salary';  
      }  
    }  
  }  
}  
```  
  
**Parent HTML:**  
```html  
<div class="employee-container">  
  <h2>Employee Management</h2>  
    
  <!-- Child component receives employee as input -->  
  <app-employee-card [employee]="selectedEmployee"></app-employee-card>  
    
  <!-- Button to change input and trigger ngOnChanges -->  
  <button (click)="updateEmployee()">Update Salary</button>  
</div>  
```  
  
**Child HTML:**  
```html  
<div class="employee-card">  
  <h3>{{ employee.name }}</h3>  
  <p>Department: {{ employee.department }}</p>  
  <p>Salary: ₹{{ employee.salary }}</p>  
    
  <!-- This updates when ngOnChanges recalculates -->  
  <span class="status">{{ salaryStatus }}</span>  
    
  <p class="info">  
    <!-- Shows when input changes -->  
    ngOnChanges detects when parent updates employee data  
  </p>  
</div>  
```  
  
**Real Use Case:**   
- When parent sends employee data, update salary calculations  
- Recalculate totals when order items change in Flipkart cart  
- Update train seat availability when user selects different date  
  
**Output Flow:**  
1. User clicks "Update Salary" button  
2. Parent updates selectedEmployee object  
3. ngOnChanges triggers in child component  
4. salaryStatus recalculated automatically  
5. HTML displays updated status  
  
---  
  
### 3. ngOnInit()  
  
**When:** Called once after the first ngOnChanges  
  
**Purpose:** Initialize component, fetch data, set up subscriptions  
  
**TypeScript:**  
```typescript  
export class EmployeeListComponent implements OnInit {  
  employees: Employee[] = [];  
  loading: boolean = false;  
  errorMessage: string = '';  
  
  constructor(private employeeService: EmployeeService) {  
    console.log('1. Constructor - service injected');  
  }  
  
  ngOnInit() {  
    console.log('3. ngOnInit - fetching data');  
    this.loading = true;  
      
    // Best place to fetch data from API  
    this.employeeService.getEmployees().subscribe({  
      next: (data) => {  
        this.employees = data;  
        this.loading = false;  
        console.log('Data loaded:', data);  
      },  
      error: (error) => {  
        this.errorMessage = 'Failed to load employees';  
        this.loading = false;  
      }  
    });  
  }  
}  
```  
  
**HTML:**  
```html  
<div class="employee-list">  
  <h2>Employee List - Indian Railways</h2>  
    
  <!-- Show loading state during API call -->  
  <div *ngIf="loading" class="loading">  
    <p>Loading employees...</p>  
    <div class="spinner"></div>  
  </div>  
    
  <!-- Show error message if API fails -->  
  <div *ngIf="errorMessage" class="error">  
    {{ errorMessage }}  
  </div>  
    
  <!-- Show data once ngOnInit completes -->  
  <div *ngIf="!loading && employees.length > 0">  
    <table>  
      <thead>  
        <tr>  
          <th>Name</th>  
          <th>Department</th>  
          <th>Location</th>  
        </tr>  
      </thead>  
      <tbody>  
        <tr *ngFor="let emp of employees">  
          <td>{{ emp.name }}</td>  
          <td>{{ emp.department }}</td>  
          <td>{{ emp.location }}</td>  
        </tr>  
      </tbody>  
    </table>  
  </div>  
    
  <!-- Show when no data -->  
  <div *ngIf="!loading && employees.length === 0">  
    <p>No employees found</p>  
  </div>  
</div>  
```  
  
**Real Use Cases:**   
- Loading employee list from LIC database  
- Fetching train schedules from Indian Railways API  
- Loading product catalog for Flipkart  
- Initializing reactive forms  
  
**Interview Tip:** Most common hook - always use this instead of constructor for initialization logic  
  
**Execution Flow:**  
1. Constructor runs → Service injected  
2. ngOnChanges runs (if inputs exist)  
3. ngOnInit runs → API call starts → loading = true  
4. HTML shows spinner  
5. API responds → employees populated → loading = false  
6. HTML shows employee table  
  
---  
  
### 4. ngDoCheck()  
  
**When:** Called during every change detection cycle  
  
**Purpose:** Detect custom changes that Angular doesn't catch automatically  
  
**TypeScript:**  
```typescript  
export class SalaryCalculatorComponent implements DoCheck {  
  @Input() baseSalary: number = 50000;  
  @Input() allowances: any = { hra: 10000, ta: 5000 };  
    
  totalSalary: number = 0;  
  previousAllowances: any = {};  
  checkCount: number = 0;  
  
  ngDoCheck() {  
    this.checkCount++;  
    console.log('4. ngDoCheck called - Check #', this.checkCount);  
      
    // Angular doesn't detect deep object changes automatically  
    // So we manually check allowances object  
    if (JSON.stringify(this.allowances) !== JSON.stringify(this.previousAllowances)) {  
      console.log('Allowances changed manually!');  
      this.calculateTotal();  
      this.previousAllowances = { ...this.allowances };  
    }  
  }  
    
  calculateTotal() {  
    this.totalSalary = this.baseSalary +   
                       this.allowances.hra +   
                       this.allowances.ta;  
  }  
}  
  
// Parent Component  
export class PayrollComponent {  
  employee = {  
    salary: 50000,  
    allowances: { hra: 10000, ta: 5000 }  
  };  
    
  updateAllowance() {  
    // Modifying object property directly  
    this.employee.allowances.hra = 15000;  
    // Angular won't detect this change - ngDoCheck will!  
  }  
}  
```  
  
**Parent HTML:**  
```html  
<div class="payroll-container">  
  <h2>Payroll System - LIC India</h2>  
    
  <!-- Passing complex object as input -->  
  <app-salary-calculator   
    [baseSalary]="employee.salary"  
    [allowances]="employee.allowances">  
  </app-salary-calculator>  
    
  <!-- Button modifies nested object property -->  
  <button (click)="updateAllowance()">  
    Increase HRA to ₹15,000  
  </button>  
</div>  
```  
  
**Child HTML:**  
```html  
<div class="salary-card">  
  <h3>Salary Breakdown</h3>  
    
  <div class="salary-details">  
    <p>Base Salary: ₹{{ baseSalary }}</p>  
    <p>HRA: ₹{{ allowances.hra }}</p>  
    <p>Travel Allowance: ₹{{ allowances.ta }}</p>  
    <hr>  
      
    <!-- This updates when ngDoCheck detects change -->  
    <p class="total">Total: ₹{{ totalSalary }}</p>  
  </div>  
    
  <p class="check-info">  
    ngDoCheck has run {{ checkCount }} times  
  </p>  
    
  <div class="info-box">  
    ngDoCheck detects changes Angular misses, like nested object modifications  
  </div>  
</div>  
```  
  
**Real Use Cases:**  
- Tracking changes in complex objects (nested employee data)  
- Monitoring array modifications in shopping cart  
- Detecting changes in form arrays  
- Custom dirty checking for unsaved changes  
  
**Warning:**   
- Called VERY frequently (on every mouse move, keyboard press)  
- Avoid heavy operations  
- Performance impact if not careful  
  
**Execution Flow:**  
1. User clicks "Increase HRA" button  
2. allowances.hra changes from 10000 to 15000  
3. Angular's change detection runs  
4. ngDoCheck executes  
5. Detects allowances object changed  
6. Recalculates totalSalary  
7. HTML shows updated total  
  
---  
  
### 5. ngAfterContentInit()  
  
**When:** Called once after first ngDoCheck, when projected content is initialized  
  
**Purpose:** Access content projected via ng-content  
  
**TypeScript:**  
```typescript  
// Card Component (receives content)  
export class CardComponent implements AfterContentInit {  
  @ContentChild('cardHeader') header!: ElementRef;  
  @ContentChild('cardContent') content!: ElementRef;  
    
  headerText: string = '';  
  contentLength: number = 0;  
  
  ngAfterContentInit() {  
    console.log('5. ngAfterContentInit - Content projected');  
      
    // Now safe to access projected content  
    if (this.header) {  
      this.headerText = this.header.nativeElement.textContent;  
      console.log('Header text:', this.headerText);  
    }  
      
    if (this.content) {  
      this.contentLength = this.content.nativeElement.textContent.length;  
      console.log('Content length:', this.contentLength);  
    }  
  }  
}  
  
// Parent Component  
export class DashboardComponent {  
  employeeName: string = 'Suresh Kumar';  
  department: string = 'Engineering';  
}  
```  
  
**Card Component HTML (Child):**  
```html  
<div class="card">  
  <div class="card-header">  
    <!-- ng-content receives projected content -->  
    <ng-content select="[card-header]"></ng-content>  
  </div>  
    
  <div class="card-body">  
    <ng-content select="[card-content]"></ng-content>  
  </div>  
    
  <div class="card-footer">  
    <!-- Display info gathered in ngAfterContentInit -->  
    <small>Header: {{ headerText }}</small>  
    <small>Content length: {{ contentLength }} characters</small>  
  </div>  
</div>  
```  
  
**Parent HTML (Using Card Component):**  
```html  
<div class="dashboard">  
  <h2>Employee Dashboard - Indian Railways</h2>  
    
  <!-- Projecting content into card component -->  
  <app-card>  
    <!-- This content is projected into ng-content -->  
    <div card-header #cardHeader>  
      <h3>Employee Information</h3>  
    </div>  
      
    <div card-content #cardContent>  
      <p>Name: {{ employeeName }}</p>  
      <p>Department: {{ department }}</p>  
      <p>Location: Pune</p>  
      <p>This content is projected from parent and accessed in ngAfterContentInit</p>  
    </div>  
  </app-card>  
    
  <!-- Another card with different content -->  
  <app-card>  
    <div card-header #cardHeader>  
      <h3>Salary Details</h3>  
    </div>  
      
    <div card-content #cardContent>  
      <p>Base Salary: ₹85,000</p>  
      <p>HRA: ₹15,000</p>  
      <p>Total: ₹1,00,000</p>  
    </div>  
  </app-card>  
</div>  
```  
  
**Real Use Cases:**  
- Building reusable card/modal/dialog components  
- Creating custom tab panels with projected content  
- Accordion components with dynamic content  
- Layout wrappers that need to read projected content  
  
**Execution Flow:**  
1. Parent renders with projected content  
2. Angular projects content into ng-content slots  
3. ngDoCheck runs  
4. ngAfterContentInit triggers  
5. Now safe to access projected elements via @ContentChild  
6. headerText and contentLength populated  
7. Card footer displays the analyzed data  
  
**Interview Tip:** Use @ContentChild to access projected content, only available after ngAfterContentInit  
  
---  
  
### 6. ngAfterContentChecked()  
  
**When:** Called after every check of projected content  
  
**Purpose:** Respond after Angular checks content  
  
**TypeScript:**  
```typescript  
export class AccordionComponent implements AfterContentChecked {  
  @ContentChildren('accordionItem') items!: QueryList<ElementRef>;  
  itemCount: number = 0;  
  lastCheckedTime: string = '';  
  
  ngAfterContentChecked() {  
    console.log('6. ngAfterContentChecked - Content verified');  
      
    // Check if number of projected items changed  
    if (this.items && this.items.length !== this.itemCount) {  
      this.itemCount = this.items.length;  
      this.lastCheckedTime = new Date().toLocaleTimeString();  
      console.log('Content items count:', this.itemCount);  
    }  
  }  
}  
```  
  
**Accordion Component HTML:**  
```html  
<div class="accordion">  
  <div class="accordion-header">  
    <h3>Department List</h3>  
    <span class="badge">{{ itemCount }} items</span>  
  </div>  
    
  <div class="accordion-body">  
    <!-- Projected content appears here -->  
    <ng-content></ng-content>  
  </div>  
    
  <div class="accordion-footer">  
    <small>Last checked: {{ lastCheckedTime }}</small>  
  </div>  
</div>  
```  
  
**Parent HTML:**  
```html  
<div class="department-list">  
  <app-accordion>  
    <!-- Each item is checked by ngAfterContentChecked -->  
    <div #accordionItem class="item">Engineering - 25 employees</div>  
    <div #accordionItem class="item">Finance - 15 employees</div>  
    <div #accordionItem class="item">HR - 10 employees</div>  
  </app-accordion>  
</div>  
```  
  
**Warning:** Called very frequently - use carefully for performance-sensitive operations  
  
---  
  
### 7. ngAfterViewInit()  
  
**When:** Called once after component's view is fully initialized  
  
**Purpose:** Access child components or DOM elements  
  
**TypeScript:**  
```typescript  
export class SearchComponent implements AfterViewInit {  
  @ViewChild('searchInput') searchInput!: ElementRef;  
  @ViewChild('resultsContainer') resultsContainer!: ElementRef;  
  @ViewChild(EmployeeTableComponent) employeeTable!: EmployeeTableComponent;  
    
  isViewReady: boolean = false;  
  inputFocused: boolean = false;  
  
  ngAfterViewInit() {  
    console.log('7. ngAfterViewInit - View fully ready');  
      
    // Safe to access DOM elements now  
    if (this.searchInput) {  
      this.searchInput.nativeElement.focus();  
      this.inputFocused = true;  
      console.log('Search input focused');  
    }  
      
    // Safe to access child component  
    if (this.employeeTable) {  
      console.log('Child component loaded:', this.employeeTable);  
      this.employeeTable.loadData();  
    }  
      
    // Initialize third-party library (like chart.js, datatables)  
    this.initializeChart();  
      
    this.isViewReady = true;  
  }  
    
  initializeChart() {  
    // Example: Initialize chart library after view is ready  
    console.log('Chart initialized on:', this.resultsContainer.nativeElement);  
  }  
    
  onSearch() {  
    const searchTerm = this.searchInput.nativeElement.value;  
    console.log('Searching for:', searchTerm);  
  }  
}  
```  
  
**Component HTML:**  
```html  
<div class="search-container">  
  <h2>Employee Search - Flipkart HR Portal</h2>  
    
  <!-- ViewChild reference to input element -->  
  <div class="search-box">  
    <input   
      #searchInput  
      type="text"   
      placeholder="Search employees by name, department..."  
      (keyup.enter)="onSearch()"  
      class="search-input"  
    >  
      
    <!-- Shows after ngAfterViewInit -->  
    <span *ngIf="inputFocused" class="status">✓ Ready to search</span>  
  </div>  
    
  <!-- ViewChild reference to container -->  
  <div #resultsContainer class="results">  
    <!-- Child component accessed via ViewChild -->  
    <app-employee-table></app-employee-table>  
  </div>  
    
  <!-- Display status from ngAfterViewInit -->  
  <div *ngIf="isViewReady" class="info-box">  
    <p>View initialized - DOM elements are ready</p>  
    <p>Search input is focused and ready for use</p>  
  </div>  
    
  <div class="features">  
    <h4>ngAfterViewInit enables:</h4>  
    <ul>  
      <li>Auto-focus on search input</li>  
      <li>Access child component methods</li>  
      <li>Initialize third-party libraries</li>  
      <li>Measure element dimensions</li>  
    </ul>  
  </div>  
</div>  
```  
  
**Real Use Cases:**  
- Auto-focusing login username field  
- Initializing date pickers, charts, maps  
- Accessing child component public methods  
- Measuring element sizes for responsive layouts  
- Setting up jQuery plugins  
- Configuring text editors (TinyMCE, CKEditor)  
  
**Common Interview Scenario:**  
```typescript  
// Wrong - Will be undefined  
constructor(private el: ElementRef) {  
  this.el.nativeElement.focus(); // ❌ View not ready yet!  
}  
  
// Correct  
ngAfterViewInit() {  
  this.el.nativeElement.focus(); // ✅ View is ready  
}  
```  
  
**Execution Flow:**  
1. Component created  
2. ngOnInit runs  
3. Template rendered  
4. All child components rendered  
5. ngAfterViewInit triggers  
6. Now safe to access @ViewChild elements  
7. Input gets focus automatically  
8. isViewReady becomes true  
9. HTML displays "View initialized" message  
  
**Interview Tip:** Use ngAfterViewInit (not ngOnInit) to access DOM elements and child components  
  
---  
  
### 8. ngAfterViewChecked()  
  
**When:** Called after every check of component's view  
  
**Purpose:** Respond after Angular checks view  
  
**TypeScript:**  
```typescript  
export class LiveDashboardComponent implements AfterViewChecked {  
  @ViewChild('statusIndicator') statusIndicator!: ElementRef;  
    
  lastUpdateTime: string = '';  
  viewCheckCount: number = 0;  
  currentStatus: string = 'Active';  
  
  ngAfterViewChecked() {  
    this.viewCheckCount++;  
    console.log('8. ngAfterViewChecked - Check #', this.viewCheckCount);  
      
    // Update timestamp after view is checked  
    this.lastUpdateTime = new Date().toLocaleTimeString();  
      
    // Check if status indicator needs styling update  
    if (this.statusIndicator) {  
      const color = this.currentStatus === 'Active' ? 'green' : 'red';  
      this.statusIndicator.nativeElement.style.backgroundColor = color;  
    }  
  }  
    
  toggleStatus() {  
    this.currentStatus = this.currentStatus === 'Active' ? 'Inactive' : 'Active';  
  }  
}  
```  
  
**Component HTML:**  
```html  
<div class="live-dashboard">  
  <h2>System Status - Indian Railways</h2>  
    
  <div class="status-panel">  
    <!-- Status indicator updated in ngAfterViewChecked -->  
    <div #statusIndicator class="status-dot"></div>  
    <span>{{ currentStatus }}</span>  
  </div>  
    
  <div class="metrics">  
    <p>Active Trains: 247</p>  
    <p>Total Passengers: 15,432</p>  
    <p>System Status: Online</p>  
  </div>  
    
  <!-- Shows how many times view was checked -->  
  <div class="debug-info">  
    <p>View checked: {{ viewCheckCount }} times</p>  
    <p>Last update: {{ lastUpdateTime }}</p>  
  </div>  
    
  <button (click)="toggleStatus()">Toggle Status</button>  
    
  <div class="warning-box">  
    ⚠️ ngAfterViewChecked runs very frequently - avoid heavy operations!  
  </div>  
</div>  
```  
  
**Warning:**   
- Called on EVERY change detection cycle  
- Runs after every mouse move, click, keyboard event  
- Can cause performance issues if misused  
- Avoid DOM manipulation that triggers more changes  
  
**Real Use Cases:**  
- Monitoring live data displays  
- Updating real-time dashboards  
- Syncing UI state after changes  
- Responsive layout adjustments  
  
**Bad Practice Example:**  
```typescript  
// ❌ DON'T DO THIS - Causes infinite loop  
ngAfterViewChecked() {  
  this.someValue = Math.random(); // Triggers another check!  
}  
```  
  
**Good Practice Example:**  
```typescript  
// ✅ DO THIS - Only update when needed  
ngAfterViewChecked() {  
  if (this.needsUpdate) {  
    this.updateDisplay();  
    this.needsUpdate = false; // Prevent continuous updates  
  }  
}  
```  
  
---  
  
### 9. ngOnDestroy()  
  
**When:** Called just before Angular destroys the component  
  
**Purpose:** Cleanup - unsubscribe, detach event handlers, stop timers  
  
**TypeScript:**  
```typescript  
export class EmployeeMonitorComponent implements OnInit, OnDestroy {  
  employees: Employee[] = [];  
    
  // Subscriptions to clean up  
  private employeeSubscription!: Subscription;  
  private timerSubscription!: Subscription;  
    
  // Timer reference  
  private refreshInterval: any;  
    
  // Event listener  
  private clickListener: any;  
    
  refreshCount: number = 0;  
  isActive: boolean = true;  
  
  constructor(  
    private employeeService: EmployeeService,  
    private renderer: Renderer2,  
    private el: ElementRef  
  ) {}  
  
  ngOnInit() {  
    console.log('Component initialized');  
      
    // 1. HTTP Subscription - needs cleanup  
    this.employeeSubscription = this.employeeService.getEmployees()  
      .subscribe(data => {  
        this.employees = data;  
        console.log('Data loaded');  
      });  
      
    // 2. Timer subscription - needs cleanup  
    this.timerSubscription = interval(5000).subscribe(() => {  
      this.refreshCount++;  
      console.log('Auto-refresh #', this.refreshCount);  
      this.refreshData();  
    });  
      
    // 3. SetInterval - needs cleanup  
    this.refreshInterval = setInterval(() => {  
      console.log('Checking for updates...');  
    }, 3000);  
      
    // 4. Event listener - needs cleanup  
    this.clickListener = this.renderer.listen(  
      this.el.nativeElement,  
      'click',  
      () => console.log('Clicked')  
    );  
  }  
  
  ngOnDestroy() {  
    console.log('9. ngOnDestroy - Component being destroyed');  
      
    // Cleanup to prevent memory leaks  
      
    // 1. Unsubscribe from HTTP calls  
    if (this.employeeSubscription) {  
      this.employeeSubscription.unsubscribe();  
      console.log('HTTP subscription closed');  
    }  
      
    // 2. Unsubscribe from timer  
    if (this.timerSubscription) {  
      this.timerSubscription.unsubscribe();  
      console.log('Timer subscription closed');  
    }  
      
    // 3. Clear interval  
    if (this.refreshInterval) {  
      clearInterval(this.refreshInterval);  
      console.log('Interval cleared');  
    }  
      
    // 4. Remove event listener  
    if (this.clickListener) {  
      this.clickListener();  
      console.log('Event listener removed');  
    }  
      
    // 5. Set active flag to false  
    this.isActive = false;  
      
    console.log('All cleanup completed - no memory leaks!');  
  }  
    
  refreshData() {  
    if (this.isActive) {  
      this.employeeService.getEmployees().subscribe();  
    }  
  }  
}  
```  
  
**Component HTML:**  
```html  
<div class="employee-monitor">  
  <h2>Real-Time Employee Monitor - LIC Portal</h2>  
    
  <!-- Active indicator -->  
  <div class="status-bar" *ngIf="isActive">  
    <span class="status-dot active"></span>  
    <span>Monitoring Active</span>  
  </div>  
    
  <!-- Auto-refresh counter -->  
  <div class="refresh-info">  
    <p>Auto-refreshed {{ refreshCount }} times</p>  
    <p class="note">Updates every 5 seconds</p>  
  </div>  
    
  <!-- Employee list -->  
  <div class="employee-list">  
    <div *ngFor="let emp of employees" class="employee-card">  
      <h4>{{ emp.name }}</h4>  
      <p>{{ emp.department }} - {{ emp.location }}</p>  
    </div>  
  </div>  
    
  <!-- Cleanup info box -->  
  <div class="cleanup-info">  
    <h4>ngOnDestroy will clean up:</h4>  
    <ul>  
      <li>✓ HTTP subscriptions (employee data)</li>  
      <li>✓ Timer subscriptions (auto-refresh)</li>  
      <li>✓ Intervals (status checks)</li>  
      <li>✓ Event listeners (click handlers)</li>  
    </ul>  
  </div>  
    
  <!-- Memory leak warning -->  
  <div class="warning-box">  
    ⚠️ Without ngOnDestroy cleanup = Memory Leaks!  
  </div>  
</div>  
```  
  
**Parent Component (Routes Between Views):**  
```html  
<div class="app-container">  
  <nav>  
    <button (click)="showMonitor = true">Show Monitor</button>  
    <button (click)="showMonitor = false">Hide Monitor (Destroy)</button>  
  </nav>  
    
  <!-- Component destroyed when showMonitor becomes false -->  
  <app-employee-monitor *ngIf="showMonitor"></app-employee-monitor>  
    
  <div *ngIf="!showMonitor" class="message">  
    Component destroyed - ngOnDestroy called - All subscriptions cleaned up!  
  </div>  
</div>  
```  
  
**Real Use Cases:**  
- Unsubscribe from WebSocket connections (live train tracking)  
- Clear timers for OTP countdown  
- Remove window scroll listeners  
- Close database connections  
- Cancel pending HTTP requests  
- Stop auto-refresh intervals  
- Cleanup third-party libraries  
  
**Memory Leak Example (Bad):**  
```typescript  
// ❌ BAD - Memory leak! Subscription never cleaned  
ngOnInit() {  
  this.employeeService.getEmployees().subscribe(data => {  
    this.employees = data;  
  });  
  // When component destroys, subscription still active in memory  
}  
```  
  
**Proper Cleanup (Good):**  
```typescript  
// ✅ GOOD - No memory leak  
private subscription!: Subscription;  
  
ngOnInit() {  
  this.subscription = this.employeeService.getEmployees().subscribe(data => {  
    this.employees = data;  
  });  
}  
  
ngOnDestroy() {  
  this.subscription.unsubscribe(); // Properly cleaned up  
}  
```  
  
**Alternative: Using takeUntil Pattern**  
```typescript  
private destroy$ = new Subject<void>();  
  
ngOnInit() {  
  this.employeeService.getEmployees()  
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => this.employees = data);  
}  
  
ngOnDestroy() {  
  this.destroy$.next();  
  this.destroy$.complete();  
}  
```  
  
**Execution Flow:**  
1. User views employee monitor component  
2. ngOnInit sets up subscriptions, timers, listeners  
3. Component displays real-time data  
4. Auto-refresh runs every 5 seconds  
5. User navigates away (*ngIf becomes false)  
6. ngOnDestroy triggers  
7. All subscriptions unsubscribed  
8. All timers cleared  
9. All listeners removed  
10. Component destroyed  
11. Memory freed - no leaks!  
  
**Interview Tip:** Always mention memory leak prevention in ngOnDestroy - this is critical!  
  
---  
  
## Complete Practical Example: All Hooks Together  
  
### Full Component with All Lifecycle Hooks  
  
**employee-detail-monitor.component.ts**  
  
```typescript  
import { Component, OnInit, OnDestroy, OnChanges, DoCheck,   
         AfterContentInit, AfterContentChecked, AfterViewInit,   
         AfterViewChecked, Input, ViewChild, ContentChild,   
         ElementRef, SimpleChanges } from '@angular/core';  
import { interval, Subscription } from 'rxjs';  
  
export class EmployeeDetailMonitorComponent implements OnInit, OnDestroy,   
       OnChanges, DoCheck, AfterContentInit, AfterContentChecked,   
       AfterViewInit, AfterViewChecked {  
    
  @Input() employeeId!: number;  
  @ViewChild('statusPanel') statusPanel!: ElementRef;  
  @ContentChild('customMessage') customMessage!: ElementRef;  
    
  employee: any;  
  hooksCalled: string[] = [];  
  private subscription!: Subscription;  
  previousEmployeeId: number = 0;  
  
  constructor(private employeeService: EmployeeService) {  
    this.logHook('1. Constructor - Component created, services injected');  
  }  
  
  ngOnChanges(changes: SimpleChanges) {  
    this.logHook('2. ngOnChanges - Input @Input() employeeId changed');  
    if (changes['employeeId']) {  
      console.log('Previous ID:', changes['employeeId'].previousValue);  
      console.log('Current ID:', changes['employeeId'].currentValue);  
    }  
  }  
  
  ngOnInit() {  
    this.logHook('3. ngOnInit - Fetching employee data from API');  
    this.subscription = this.employeeService  
      .getEmployeeById(this.employeeId)  
      .subscribe(data => {  
        this.employee = data;  
        console.log('Employee data loaded:', data);  
      });  
  }  
  
  ngDoCheck() {  
    this.logHook('4. ngDoCheck - Custom change detection');  
    if (this.employeeId !== this.previousEmployeeId) {  
      console.log('Employee ID changed manually detected');  
      this.previousEmployeeId = this.employeeId;  
    }  
  }  
  
  ngAfterContentInit() {  
    this.logHook('5. ngAfterContentInit - Projected content initialized');  
    if (this.customMessage) {  
      console.log('Custom message:', this.customMessage.nativeElement.textContent);  
    }  
  }  
  
  ngAfterContentChecked() {  
    this.logHook('6. ngAfterContentChecked - Content verified');  
  }  
  
  ngAfterViewInit() {  
    this.logHook('7. ngAfterViewInit - View fully rendered');  
    if (this.statusPanel) {  
      this.statusPanel.nativeElement.style.backgroundColor = '#d4edda';  
      console.log('Status panel styled');  
    }  
  }  
  
  ngAfterViewChecked() {  
    this.logHook('8. ngAfterViewChecked - View checked');  
  }  
  
  ngOnDestroy() {  
    this.logHook('9. ngOnDestroy - Component being destroyed');  
    if (this.subscription) {  
      this.subscription.unsubscribe();  
      console.log('Subscription cleaned up - No memory leak!');  
    }  
  }  
  
  private logHook(message: string) {  
    console.log(message);  
    this.hooksCalled.push(message);  
  }  
}  
```  
  
**employee-detail-monitor.component.html**  
  
```html  
<div class="lifecycle-demo">  
  <h2>Complete Lifecycle Hooks Demo - Employee Monitor</h2>  
    
  <!-- Shows data loaded in ngOnInit -->  
  <div class="employee-info" *ngIf="employee">  
    <h3>{{ employee.name }}</h3>  
    <p>Department: {{ employee.department }}</p>  
    <p>Location: {{ employee.location }}</p>  
    <p>Salary: ₹{{ employee.salary }}</p>  
  </div>  
    
  <!-- ViewChild reference - accessed in ngAfterViewInit -->  
  <div #statusPanel class="status-panel">  
    <h4>System Status</h4>  
    <p>All lifecycle hooks functioning correctly</p>  
    <p>Background color set in ngAfterViewInit</p>  
  </div>  
    
  <!-- ContentChild - projected content accessed in ngAfterContentInit -->  
  <div class="projected-content">  
    <h4>Projected Content Area:</h4>  
    <ng-content></ng-content>  
  </div>  
    
  <!-- Display all hooks called -->  
  <div class="hooks-log">  
    <h4>Lifecycle Hooks Execution Log:</h4>  
    <div class="log-container">  
      <div *ngFor="let hook of hooksCalled; let i = index" class="log-entry">  
        <span class="log-number">{{ i + 1 }}</span>  
        <span class="log-message">{{ hook }}</span>  
      </div>  
    </div>  
  </div>  
    
  <!-- Visual representation -->  
  <div class="visual-flow">  
    <h4>Hook Execution Flow:</h4>  
    <div class="flow-diagram">  
      <div class="flow-item">Constructor ➜</div>  
      <div class="flow-item">ngOnChanges ➜</div>  
      <div class="flow-item">ngOnInit ➜</div>  
      <div class="flow-item">ngDoCheck ➜</div>  
      <div class="flow-item">ngAfterContentInit ➜</div>  
      <div class="flow-item">ngAfterContentChecked ➜</div>  
      <div class="flow-item">ngAfterViewInit ➜</div>  
      <div class="flow-item">ngAfterViewChecked</div>  
      <div class="flow-item destroy">Component Destroyed ➜ ngOnDestroy</div>  
    </div>  
  </div>  
    
  <!-- Information boxes -->  
  <div class="info-grid">  
    <div class="info-card">  
      <h5>🔧 Constructor</h5>  
      <p>Inject services only</p>  
    </div>  
    <div class="info-card">  
      <h5>🔄 ngOnChanges</h5>  
      <p>Track @Input() changes</p>  
    </div>  
    <div class="info-card">  
      <h5>🚀 ngOnInit</h5>  
      <p>Initialize & fetch data</p>  
    </div>  
    <div class="info-card">  
      <h5>👁️ ngDoCheck</h5>  
      <p>Custom change detection</p>  
    </div>  
    <div class="info-card">  
      <h5>📦 ngAfterContentInit</h5>  
      <p>Access ng-content</p>  
    </div>  
    <div class="info-card">  
      <h5>✅ ngAfterContentChecked</h5>  
      <p>Content verified</p>  
    </div>  
    <div class="info-card">  
      <h5>🎨 ngAfterViewInit</h5>  
      <p>Access DOM & @ViewChild</p>  
    </div>  
    <div class="info-card">  
      <h5>🔍 ngAfterViewChecked</h5>  
      <p>View verified</p>  
    </div>  
    <div class="info-card destroy">  
      <h5>🧹 ngOnDestroy</h5>  
      <p>Cleanup & unsubscribe</p>  
    </div>  
  </div>  
</div>  
```  
  
**Parent Component HTML (Using the Monitor)**  
  
```html  
<div class="app-container">  
  <h1>Employee Management System - LIC India</h1>  
    
  <!-- Controls to test lifecycle -->  
  <div class="controls">  
    <button (click)="selectedEmployeeId = 1">  
      Load Suresh Kumar (ID: 1)  
    </button>  
    <button (click)="selectedEmployeeId = 2">  
      Load Ramesh Patel (ID: 2)  
    </button>  
    <button (click)="showMonitor = false">  
      Destroy Component  
    </button>  
  </div>  
    
  <!-- Component with all lifecycle hooks -->  
  <app-employee-detail-monitor   
    *ngIf="showMonitor"  
    [employeeId]="selectedEmployeeId">  
      
    <!-- This content is projected - accessed in ngAfterContentInit -->  
    <div #customMessage class="custom-message">  
      <p>This is projected content from parent component</p>  
      <p>Accessed via @ContentChild in ngAfterContentInit</p>  
    </div>  
      
  </app-employee-detail-monitor>  
    
  <!-- Message shown after component destruction -->  
  <div *ngIf="!showMonitor" class="destruction-message">  
    <h3>Component Destroyed!</h3>  
    <p>ngOnDestroy was called</p>  
    <p>All subscriptions cleaned up</p>  
    <button (click)="showMonitor = true">Recreate Component</button>  
  </div>  
</div>  
```  
  
**Styling (CSS)**  
  
```css  
.lifecycle-demo {  
  max-width: 1200px;  
  margin: 0 auto;  
  padding: 20px;  
  font-family: Arial, sans-serif;  
}  
  
.employee-info {  
  background: #e3f2fd;  
  padding: 20px;  
  border-radius: 8px;  
  margin-bottom: 20px;  
}  
  
.status-panel {  
  padding: 20px;  
  border-radius: 8px;  
  margin-bottom: 20px;  
  border: 2px solid #28a745;  
}  
  
.hooks-log {  
  background: #f8f9fa;  
  padding: 20px;  
  border-radius: 8px;  
  margin: 20px 0;  
}  
  
.log-container {  
  max-height: 400px;  
  overflow-y: auto;  
}  
  
.log-entry {  
  padding: 10px;  
  margin: 5px 0;  
  background: white;  
  border-left: 4px solid #007bff;  
  display: flex;  
  align-items: center;  
}  
  
.log-number {  
  background: #007bff;  
  color: white;  
  padding: 5px 10px;  
  border-radius: 50%;  
  margin-right: 10px;  
  font-weight: bold;  
}  
  
.flow-diagram {  
  display: flex;  
  flex-wrap: wrap;  
  gap: 10px;  
  margin-top: 10px;  
}  
  
.flow-item {  
  background: #007bff;  
  color: white;  
  padding: 10px 15px;  
  border-radius: 5px;  
  font-weight: 600;  
}  
  
.flow-item.destroy {  
  background: #dc3545;  
}  
  
.info-grid {  
  display: grid;  
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  
  gap: 15px;  
  margin-top: 20px;  
}  
  
.info-card {  
  background: white;  
  padding: 15px;  
  border-radius: 8px;  
  border: 2px solid #007bff;  
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  
}  
  
.info-card.destroy {  
  border-color: #dc3545;  
}  
  
.info-card h5 {  
  margin: 0 0 10px 0;  
  color: #007bff;  
}  
  
.info-card.destroy h5 {  
  color: #dc3545;  
}  
  
.controls {  
  display: flex;  
  gap: 10px;  
  margin-bottom: 20px;  
}  
  
.controls button {  
  padding: 10px 20px;  
  background: #28a745;  
  color: white;  
  border: none;  
  border-radius: 5px;  
  cursor: pointer;  
  font-weight: 600;  
}  
  
.controls button:hover {  
  background: #218838;  
}  
  
.destruction-message {  
  background: #f8d7da;  
  color: #721c24;  
  padding: 30px;  
  border-radius: 8px;  
  text-align: center;  
}  
```  
  
**What Happens When You Run This:**  
  
1. **Component Creation:**  
   - Constructor logs first  
   - Services injected  
     
2. **Input Binding:**  
   - ngOnChanges detects employeeId input  
   - Logs previous and current values  
  
3. **Initialization:**  
   - ngOnInit fetches employee data from API  
   - Subscription created  
   - Employee info displays in HTML  
  
4. **Content Projection:**  
   - ngAfterContentInit accesses projected message  
   - Logs custom message content  
  
5. **View Initialization:**  
   - ngAfterViewInit accesses statusPanel  
   - Sets background color on status panel  
   - DOM is fully ready  
  
6. **Change Detection Cycles:**  
   - ngDoCheck runs frequently  
   - ngAfterContentChecked runs frequently    
   - ngAfterViewChecked runs frequently  
   - All logged in the hooks log  
  
7. **Component Destruction:**  
   - User clicks "Destroy Component"  
   - ngOnDestroy executes  
   - Subscription unsubscribed  
   - Memory cleaned up  
   - Destruction message shows  
  
**Testing the Flow:**  
  
1. Click "Load Suresh Kumar" → ngOnChanges triggers  
2. Watch hooks log populate in order  
3. See status panel turn green (ngAfterViewInit)  
4. Click "Load Ramesh Patel" → ngOnChanges triggers again with new ID  
5. Click "Destroy Component" → ngOnDestroy triggers, cleanup happens  
6. Click "Recreate Component" → Entire cycle starts again from Constructor  
  
This complete example demonstrates all 9 lifecycle hooks with real HTML integration and visual feedback!  
  
---  
  
## HTTP Interceptors  
  
Interceptors catch every HTTP request and response, allowing you to modify them globally.  
  
### What Can Interceptors Do?  
  
- Add authentication tokens to requests  
- Log all HTTP requests  
- Handle errors globally  
- Show/hide loading spinners  
- Transform request/response data  
- Retry failed requests  
  
---  
  
### Creating an Interceptor  
  
**Step 1: Create Interceptor File**  
  
**auth.interceptor.ts**  
```typescript  
import { HttpInterceptorFn } from '@angular/core';  
  
export const authInterceptor: HttpInterceptorFn = (req, next) => {  
  // Get token from localStorage  
  const token = localStorage.getItem('authToken');  
    
  // Clone request and add Authorization header  
  if (token) {  
    req = req.clone({  
      setHeaders: {  
        Authorization: `Bearer ${token}`  
      }  
    });  
  }  
  
  console.log('Request sent:', req.url);  
    
  // Pass to next interceptor or backend  
  return next(req);  
};  
```  
  
**Step 2: Register Interceptor**  
  
**app.config.ts**  
```typescript  
import { ApplicationConfig } from '@angular/core';  
import { provideHttpClient, withInterceptors } from '@angular/common/http';  
import { authInterceptor } from './interceptors/auth.interceptor';  
  
export const appConfig: ApplicationConfig = {  
  providers: [  
    provideHttpClient(withInterceptors([authInterceptor]))  
  ]  
};  
```  
  
---  
  
### Real-World Interceptor Examples  
  
#### 1. Authentication Interceptor  
  
```typescript  
export const authInterceptor: HttpInterceptorFn = (req, next) => {  
  const token = localStorage.getItem('token');  
    
  if (token) {  
    req = req.clone({  
      setHeaders: { Authorization: `Bearer ${token}` }  
    });  
  }  
    
  return next(req);  
};  
```  
  
**Use Case:** Automatically attach token to every API request for LIC portal, Indian Railways booking system  
  
---  
  
#### 2. Loading Interceptor  
  
```typescript  
import { inject } from '@angular/core';  
import { LoadingService } from '../services/loading.service';  
  
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {  
  const loadingService = inject(LoadingService);  
    
  loadingService.show();  
    
  return next(req).pipe(  
    finalize(() => loadingService.hide())  
  );  
};  
```  
  
**Use Case:** Show spinner during Flipkart order processing, payment gateway calls  
  
---  
  
#### 3. Error Handling Interceptor  
  
```typescript  
import { catchError, throwError } from 'rxjs';  
  
export const errorInterceptor: HttpInterceptorFn = (req, next) => {  
  return next(req).pipe(  
    catchError(error => {  
      if (error.status === 401) {  
        console.log('Unauthorized - Redirecting to login');  
        // Redirect to login  
      } else if (error.status === 500) {  
        console.log('Server error - Please try again');  
      }  
      return throwError(() => error);  
    })  
  );  
};  
```  
  
**Use Case:** Handle session timeout in banking apps, server errors in e-commerce checkout  
  
---  
  
#### 4. Logging Interceptor  
  
```typescript  
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {  
  const startTime = Date.now();  
    
  console.log('Request:', req.method, req.url);  
    
  return next(req).pipe(  
    tap(response => {  
      const duration = Date.now() - startTime;  
      console.log('Response received in', duration, 'ms');  
    })  
  );  
};  
```  
  
**Use Case:** Track API performance for Indian Railways seat availability, monitor response times  
  
---  
  
#### 5. Cache Interceptor  
  
```typescript  
import { of } from 'rxjs';  
  
const cache = new Map<string, any>();  
  
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {  
  // Only cache GET requests  
  if (req.method !== 'GET') {  
    return next(req);  
  }  
    
  const cachedResponse = cache.get(req.url);  
  if (cachedResponse) {  
    console.log('Returning cached response');  
    return of(cachedResponse);  
  }  
    
  return next(req).pipe(  
    tap(response => {  
      cache.set(req.url, response);  
    })  
  );  
};  
```  
  
**Use Case:** Cache department list, location list, static data  
  
---  
  
### Multiple Interceptors  
  
You can chain multiple interceptors:  
  
```typescript  
export const appConfig: ApplicationConfig = {  
  providers: [  
    provideHttpClient(  
      withInterceptors([  
        authInterceptor,  
        loggingInterceptor,  
        errorInterceptor,  
        loadingInterceptor  
      ])  
    )  
  ]  
};  
```  
  
**Execution Order:**  
Request: auth → logging → error → loading → Backend  
Response: Backend → loading → error → logging → auth  
  
---  
  
## Quick Comparison  
  
### Constructor vs ngOnInit  
  
| Constructor | ngOnInit |  
|------------|----------|  
| Class initialization | Component initialization |  
| Inject dependencies | Fetch data, setup logic |  
| No input properties available | Input properties available |  
| Called by TypeScript | Called by Angular |  
  
### ngOnChanges vs ngDoCheck  
  
| ngOnChanges | ngDoCheck |  
|------------|-----------|  
| Only for @Input changes | For any changes |  
| Automatic detection | Manual detection |  
| Called less frequently | Called very frequently |  
  
---  
  
## Interview Questions & Answers  
  
**Q1: Why use ngOnInit instead of constructor?**  
Constructor is for dependency injection. ngOnInit is called after inputs are set, making it ideal for initialization logic.  
  
**Q2: When would you use ngOnDestroy?**  
To unsubscribe from observables, clear intervals, remove event listeners - prevent memory leaks.  
  
**Q3: What is the purpose of HTTP Interceptors?**  
To intercept and modify HTTP requests/responses globally - add headers, handle errors, logging.  
  
**Q4: Can we have multiple interceptors?**  
Yes, they execute in the order they are provided, forming a chain.  
  
**Q5: Difference between ngAfterViewInit and ngAfterContentInit?**  
- ngAfterViewInit: Component's own view is ready  
- ngAfterContentInit: Projected content (ng-content) is ready  
  
---  
  
## Practice Exercise  
  
Create a component that:  
1. Receives employee ID as input  
2. Fetches employee data in ngOnInit  
3. Shows loading state  
4. Focuses on edit button in ngAfterViewInit  
5. Cleans up subscription in ngOnDestroy  
  
Create an interceptor that:  
1. Adds authentication token  
2. Logs request URL  
3. Handles 401 errors by redirecting to login  
4. Shows loading spinner  
  
---  
  
## Quick Tips  
  
**For Lifecycle Hooks:**  
- Use ngOnInit for data fetching  
- Use ngOnDestroy for cleanup  
- Use ngAfterViewInit for DOM access  
- Avoid heavy operations in ngDoCheck and ngAfterContentChecked  
  
**For Interceptors:**  
- Always return next(req) to continue the chain  
- Clone requests before modifying  
- Handle errors gracefully  
- Order matters when using multiple interceptors  
  
---  
  
## Conclusion  
  
Lifecycle hooks help you control component behavior at different stages. Interceptors provide centralized HTTP request/response handling. Mastering both is essential for building robust Angular applications and clearing interviews.  
  
Practice these concepts in real projects like employee management, student portals, or e-commerce applications to gain confidence.