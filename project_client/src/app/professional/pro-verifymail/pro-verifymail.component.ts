import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../professional-service/services.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-verifymail',
  templateUrl: './pro-verifymail.component.html',
  styleUrls: ['./pro-verifymail.component.css']
})
export class ProVerifymailComponent {

  forgotForm!:FormGroup
  otpForm!:FormGroup
  email: any

  otpDiv = false

  constructor(private fb:FormBuilder, 
    private service:ServicesService,
    private router:Router){}

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
    this.email = this.forgotForm.value
    console.log(this.email,'this.email');
    
    this.service.professionalVerifyMail(this.email).subscribe((response:any)=>{
      console.log(response);
      if (response.success) {
        this.otpDiv = true
      }
    })
   }

   getOtp(){
    let data = {
      email:this.email,
      otp: this.otpForm.value,
    }
    // const otpData = this.otpForm.value
    console.log(data, 'data');
    this.service.professionalVerifyOtp(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.router.navigate(['/professionalLogin'])
      }
    })
    
   }

}
 