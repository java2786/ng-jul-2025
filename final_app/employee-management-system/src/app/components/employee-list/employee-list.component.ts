import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { SalaryFormatPipe } from '../../pipes/salary-format.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    SalaryFormatPipe, 
    // FilterPipe,
    HighlightDirective
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
        alert('Employee deleted successfully!');
      });
    }
  }

sortBy(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc'; 
  }

  this.filteredEmployees.sort((a, b) => {
    const valueA = a[column as keyof Employee];
    const valueB = b[column as keyof Employee];

    if (valueA === undefined && valueB === undefined) {
      return 0;
    }
    if (valueA === undefined) {
      return this.sortDirection === 'asc' ? -1 : 1; 
    }
    if (valueB === undefined) {
      return this.sortDirection === 'asc' ? 1 : -1; 
    }

    const normalizedA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA;
    const normalizedB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB;

    if (normalizedA < normalizedB) {
      return this.sortDirection === 'asc' ? -1 : 1; 
    }
    if (normalizedA > normalizedB) {
      return this.sortDirection === 'asc' ? 1 : -1; 
    }

    return 0;
  });
}


  onSearch(): void {
    if (this.searchText.trim()) {
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.department.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.location.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }
}