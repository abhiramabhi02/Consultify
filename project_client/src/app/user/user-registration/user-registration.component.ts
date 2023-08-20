import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-Services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  RegistrationForm!: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private services: UserServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.RegistrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]
    });
  }

  registration() {
    if (this.RegistrationForm.invalid) {
      // If the form is invalid, mark all form controls as touched to show validation errors
      Object.keys(this.RegistrationForm.controls).forEach(controlName =>
        this.RegistrationForm.controls[controlName].markAsTouched()
      );
      return;
    }

    const formData = this.RegistrationForm.value;
    console.log(formData, 'formData');
    this.services.userRegistration(formData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.message = response.message;
        
        setTimeout(() => {
          this.router.navigate(['/userlogin']);
        }, 2000);
      }
    });
  }

}
