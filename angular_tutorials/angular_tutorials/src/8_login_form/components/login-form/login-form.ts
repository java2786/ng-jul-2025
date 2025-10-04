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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    // this.userForm = new FormGroup({
    //   email: new FormControl('abc', [Validators.required, Validators.email]),
    //   password: new FormControl('123')
    // })
  }

  ngOnInit(){
      
  }

  onLogin(){
    console.log(this.userForm.value)
    console.log("Email: "+this.userForm.controls["email"].valid)
    console.log("Pwd: "+this.userForm.controls["password"].valid)
    console.log(this.userForm.valid)
    console.log("****************")
    console.log(this.userForm)

    console.log("****************")
    console.log("Sending request to backend")


    setTimeout(() => {
      console.log("Success from backend")
      this.userForm.reset()
      this.errorMessage = "Backend Error";
    }, 4000);


    
  }
}

