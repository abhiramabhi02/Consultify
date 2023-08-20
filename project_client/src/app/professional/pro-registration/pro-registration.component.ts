import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../professional-service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-registration',
  templateUrl: './pro-registration.component.html',
  styleUrls: ['./pro-registration.component.css']
})
export class ProRegistrationComponent implements OnInit {

  RegistrationForm!: FormGroup

  professionOptions = [
    { value: null, label: 'Select your profession' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Chartered Accountant', label: 'Chartered Accountant' },
    { value: 'Lawyer', label: 'Lawyer' },
  ];

constructor(private fb:FormBuilder,
   private service:ServicesService,
   private router:Router){}

ngOnInit(): void {
  this.createForm()
}

createForm() {
  this.RegistrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
    profession: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
    cpassword: ['', [Validators.required, Validators.pattern(/^\S.*$/)]]
  });
}

proRegistration(){

  if (this.RegistrationForm.invalid) {
    // If the form is invalid, mark all form controls as touched to show validation errors
    Object.keys(this.RegistrationForm.controls).forEach(controlName =>
      this.RegistrationForm.controls[controlName].markAsTouched()
    );
    return;
  }

  const data = this.RegistrationForm.value
  console.log(data, 'data professional');
  
  this.service.professionalReg(data).subscribe((response:any)=>{
    console.log(response,'response');
    if(response.success){
      setTimeout(()=>{
        this.router.navigate(['/professionalLogin'])
      },800)
    }
  })
}

}
