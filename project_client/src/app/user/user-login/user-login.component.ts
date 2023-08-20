import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-Services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: any;
  errorMessage: any;
  showMessage = false;

  constructor(private service: UserServicesService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  userLogin() {
    if (this.loginForm.invalid) {
      // If the form is invalid, mark all form controls as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(controlName =>
        this.loginForm.controls[controlName].markAsTouched()
      );
      return;
    }

    const data = this.loginForm.value;
    console.log(data, 'user login data');

    this.service.userLogin(data).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.showMessage = true;
        console.log('success');
        this.message = response.message;
        localStorage.setItem('token', response.token);

        this.router.navigate(['/userhome']);
      } else {
        this.showMessage = true;
        this.errorMessage = response.message;
        console.log('login failed');
      }
    });
  }
}
