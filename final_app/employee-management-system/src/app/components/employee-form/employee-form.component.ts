import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId?: number;
  departments: any[] = [];
  locations = ['Pune', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kolkata'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(10000)]],
      dateOfJoining: ['', Validators.required],
      location: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      this.employeeForm.patchValue(employee);
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
      return;
    }

    const employee: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe(() => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe(() => {
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);
      });
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
}