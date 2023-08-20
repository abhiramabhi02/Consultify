import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.css']
})
export class VerifyMailComponent {


  forgotForm!:FormGroup
  otpForm!:FormGroup
  email: any

  otpDiv = false

  constructor(private fb:FormBuilder, 
    private service:UserServicesService,
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
    
    this.service.sendVerifyMail(this.email).subscribe((response:any)=>{
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
    this.service.otpVerify(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.router.navigate(['/userlogin'])
      }
    })
    
   }


}
