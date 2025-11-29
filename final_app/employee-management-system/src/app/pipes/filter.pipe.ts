import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(emps: Employee[], searchText: string): Employee[] {
    if (!emps || !searchText) {
      return emps;
    }

    searchText = searchText.toLowerCase();

    return emps.filter(emp => {
      return (
        emp.name.toLowerCase().includes(searchText) ||
        emp.email.toLowerCase().includes(searchText) ||
        emp.department.toLowerCase().includes(searchText) ||
        emp.location.toLowerCase().includes(searchText)
      );
    });
  }
}