import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  // DI
  constructor(private fb:FormBuilder){
    this.userForm = new FormGroup({});
  }

  ngOnInit(){
      this.userForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onLogin(){
    console.log(this.userForm.value)
    console.log(this.userForm.controls["email"].valid)
    console.log(this.userForm.controls["password"].valid)
  }
}

