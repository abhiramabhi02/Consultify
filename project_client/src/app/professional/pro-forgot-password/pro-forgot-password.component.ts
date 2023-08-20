import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-pro-forgot-password',
  templateUrl: './pro-forgot-password.component.html',
  styleUrls: ['./pro-forgot-password.component.css']
})
export class ProForgotPasswordComponent implements OnInit {
  forgotForm!:FormGroup
  otpForm!:FormGroup

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    
    this.createFormemail()
    this.createFormotp()
  }

  createFormemail(){
   this.forgotForm = this.fb.group({
    email:['', Validators.required]
   })
  }

  createFormotp(){
    this.otpForm = this.fb.group({
     otp:['', Validators.required]
    })
   }

   getEmail(){
    const emailData = this.forgotForm.value
   }

   getOtp(){
    const otpData = this.otpForm.value
   }
}
