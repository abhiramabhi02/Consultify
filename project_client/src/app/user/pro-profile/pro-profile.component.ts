import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-Services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pro-profile',
  templateUrl: './pro-profile.component.html',
  styleUrls: ['./pro-profile.component.css']
})
export class ProProfileComponent implements OnInit {

  id:any
  proData: any

  constructor(private service:UserServicesService, 
    private router:Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.getId()
    this.getProDetails()
  }

  getId(){
    this.activatedRoute.params.subscribe((params)=>{
      this.id = params['id']
      console.log(this.id, 'id');
      
    })
  }

  getProDetails(){
     let data = {
      id:this.id
      }
      this.service.proProfile(data).subscribe((response:any)=>{
        console.log(response);
        if(response.success){
          this.proData = response.pro
        }
      })
  }


}
