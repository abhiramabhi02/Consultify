import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Admin-Services/services.service';

@Component({
  selector: 'app-admin-professionals',
  templateUrl: './admin-professionals.component.html',
  styleUrls: ['./admin-professionals.component.css']
})
export class AdminProfessionalsComponent implements OnInit {

  ProfessionalsData:any
  constructor(private service:ServicesService){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.service.getAllProfessionals().subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.ProfessionalsData = response.professionals
      }
    })
  }

  confirmBlock(id: String): void {
    if (window.confirm('Are you sure you want to block this Professional?')) {
      // Call the unblockuser method or any other logic
      this.blockprofessional(id);
    }
  }

  blockprofessional(id:any){
    console.log(id, 'id');
    let data = {
      ID:id
    }
    this.service.blockProfessional(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        window.location.reload()
      }
    })
  }

  confirmUnblock(id: String): void {
    if (window.confirm('Are you sure you want to unblock this Professional?')) {
      // Call the unblockuser method or any other logic
      this.unblockprofessional(id);
    }
  }

  unblockprofessional(id:any){
    console.log(id, 'id');
    let data = {
      ID:id
    }
    this.service.unblockProfessional(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        window.location.reload()
      }
    })
  }
}
