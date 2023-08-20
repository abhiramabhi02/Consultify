import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../user-Services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
})
export class UserAppointmentsComponent implements OnInit {
  appointmentData: any;
  userId: any;

  constructor(
    private service: UserServicesService,
    private routes: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getAppointments();
  }

  getId() {
    let id = this.routes.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  getAppointments() {
    let data = {
      id: this.userId,
    };
    this.service.getAllAppointments(data).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.appointmentData = response.appointments;
      }
    });
  }

  appointmentFind(array:any, id:any){
    return array.find((obj:any)=> obj._id === id)
  }

  payment(id:any){

    let data = this.appointmentFind(this.appointmentData, id)
     console.log(data, 'data');     
     this.router.navigate(['/payment'],
     {queryParams:data})
  }
}
