import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Admin-Services/services.service';
import { response } from 'express';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  AppointmentData:any

  constructor(private service:ServicesService){}

  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments(){
    this.service.appointmentLoading().subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.AppointmentData = response.appointement
      }
    })
  }
}
