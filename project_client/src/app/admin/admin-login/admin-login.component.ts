import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../Admin-Services/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  adminLoginForm!: FormGroup

  constructor(private service:ServicesService,
     private fb: FormBuilder,
     private router:Router){}

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.adminLoginForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  adminLogin(){
    const data = this.adminLoginForm.value
    console.log(data, 'data admin');
    this.service.adminLogin(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        localStorage.setItem('adminToken', response.token)
        console.log('login success admin');
        this.router.navigate(['admin'])
      }
      
    })
    
  }

}
