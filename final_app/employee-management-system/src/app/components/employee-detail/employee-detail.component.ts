import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { SalaryFormatPipe } from '../../pipes/salary-format.pipe';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SalaryFormatPipe],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.loadEmployee();
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {
        alert('Employee deleted successfully!');
        this.router.navigate(['/employees']);
      });
    }
  }
}