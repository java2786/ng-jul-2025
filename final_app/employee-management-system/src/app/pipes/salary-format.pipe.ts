import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
  standalone: true
})
export class SalaryFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '₹0';
    
    // Convert to Indian number format
    const formattedValue = value.toLocaleString('en-IN');
    return `₹${formattedValue}`;
  }
}

