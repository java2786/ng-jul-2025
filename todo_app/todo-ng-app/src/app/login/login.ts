import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-login',  
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.html',  
  styleUrls: ['./login.css']  
})  
export class LoginComponent {  
  username: string = '';  
  password: string = '';  
  errorMessage: string = '';  
  
  constructor(private router: Router) {}  
  
  login() {  
    // Hard-coded credentials  
    const validUsername = 'admin';  
    const validPassword = 'admin@123';  
  
    if (this.username === validUsername && this.password === validPassword) {  
      // Login successful  
      console.log('Login successful!');  
      this.errorMessage = '';  
      // Navigate to todo list (we'll create this later)  
      this.router.navigate(['/todos']);  
    } else {  
      // Login failed  
      this.errorMessage = 'Invalid username or password!';  
    }  
  }  
}  