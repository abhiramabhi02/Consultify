import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../professional-service/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-login',
  templateUrl: './pro-login.component.html',
  styleUrls: ['./pro-login.component.css']
})
export class ProLoginComponent implements OnInit{
  proLoginForm!: FormGroup
  message:any
  errorMessage:any
  showMessage = false

  constructor(private service:ServicesService,
     private fb: FormBuilder,
     private router:Router){}

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.proLoginForm = this.fb.group({
      email:['',[ Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  proLogin(){

    if (this.proLoginForm.invalid) {
      // If the form is invalid, mark all form controls as touched to show validation errors
      Object.keys(this.proLoginForm.controls).forEach(controlName =>
        this.proLoginForm.controls[controlName].markAsTouched()
      );
      return;
    }

    const loginData = this.proLoginForm.value
    console.log(loginData, ' logindata');

    this.service.professionalLogin(loginData).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.showMessage = true
        this.message = response.message
        localStorage.setItem('proToken', response.token)
        console.log('login success');
        this.router.navigate(['/professionalDashboard'])
        
      }else{
        this.showMessage = true
        this.errorMessage = response.message
      }
      
    })
    
  }
}
