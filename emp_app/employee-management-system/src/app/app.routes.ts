import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees', 
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/new', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id/edit', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];