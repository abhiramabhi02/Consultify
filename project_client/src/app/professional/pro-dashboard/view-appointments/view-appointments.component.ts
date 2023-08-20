import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { ServicesService } from '../../professional-service/services.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css'],
})
export class ViewAppointmentsComponent implements OnInit {
  proId: any;
  appointmentData: any;

  constructor(
    private routes: ActivatedRoute,
    private service: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getAppointments();
  }

  getId() {
    this.routes.params.subscribe((params) => {
      this.proId = params['id'];
      console.log(this.proId);
    });
  }

  getAppointments() {
    let data = {
      proId: this.proId,
    };
    console.log(data, 'data');

    this.service.professionalAppointments(data).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.appointmentData = response.appointments;
        console.log(this.appointmentData, 'appoint');
      }
    });
  }

  confirmAppointment(id: String) {
    console.log(id);
    let data = {
      id: id,
    };
    this.service.confirmAppointment(data).subscribe((response: any) => {
      console.log(response);
      if(response.success){
        window.location.reload()
      }
    });
  }

  cancelAppointment(id: String) {
    console.log(id);
    let data = {
      id: id,
    };
    this.service.cancelAppointment(data).subscribe((response: any) => {
      console.log(response);
      if(response.success){
        window.location.reload()
      }
    });
  }
}
