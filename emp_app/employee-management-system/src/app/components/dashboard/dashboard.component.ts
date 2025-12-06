import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  activeEmployees: number = 0;
  totalSalary: number = 0;
  departmentCount: number = 0;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.totalEmployees = employees.length;
      this.activeEmployees = employees.filter(e => e.isActive).length;
      this.totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
      this.departmentCount = new Set(employees.map(e => e.department)).size;
    });
  }
}