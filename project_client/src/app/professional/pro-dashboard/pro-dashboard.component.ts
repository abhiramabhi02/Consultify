import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../professional-service/services.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-pro-dashboard',
  templateUrl: './pro-dashboard.component.html',
  styleUrls: ['./pro-dashboard.component.css']
})
export class ProDashboardComponent implements OnInit {
  Id:any 
  proDetails:any

  constructor(private service:ServicesService,
     private router:Router){}

  ngOnInit(): void {
    this.getId()
    this.loadDashboard()
  }
  
  getId(){
    const token = localStorage.getItem('proToken')!
    const proPayload = atob(token.split('.')[1])
    this.Id = JSON.parse(proPayload)
    console.log(this.Id, 'payload'); 
  }

  loadDashboard(){
    let data ={
      id:this.Id.proId
    }
    this.service.loadProfessionalDashboard(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.proDetails = response.pro
      }
    })
  }
}
