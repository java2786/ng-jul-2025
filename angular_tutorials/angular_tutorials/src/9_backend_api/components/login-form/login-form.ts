import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login-form',
  // providers: [BrowserModule, ReactiveFormsModule],
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm implements OnInit {
  userForm:FormGroup;
  errorMessage:String = '';

  // DI
  constructor(private fb:FormBuilder){
    this.userForm = this.fb.group({
      email: ['demo@ymail.com', [Validators.email, Validators.required]],
      password: ['adminadmin', [Validators.required, Validators.minLength(8)]]
    })
    // this.userForm = new FormGroup({
    //   email: new FormControl('abc', [Validators.required, Validators.email]),
    //   password: new FormControl('123')
    // })
  }

  ngOnInit(){
      
  }

  onLogin(){

    // setTimeout(() => {
    //   console.log("Success from backend")
    //   this.userForm.reset()
    //   this.errorMessage = "Backend Error";
    // }, 4000);

fetch('https://fakestoreapi.com/users/2')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    this.userForm.reset()
  })
  .catch(err => {
    console.log(err)
    this.errorMessage = err.message;
  })
    
  }
}

