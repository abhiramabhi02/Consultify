import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-Services/user-services.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id:any
  userData:any

  constructor(private service:UserServicesService){}

  ngOnInit(): void {
      this.getId()
      this.getUserData()
  }

  getId(){
    let token = localStorage.getItem('token')!
    let payload = atob(token.split('.')[1])
    let id = JSON.parse(payload)
    this.id = id.userId
    console.log(this.id, 'id');
  }

  getUserData(){
    let data = {
      id:this.id
    }
    this.service.getUser(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.userData = response.user
      }
      
    })
  }

}
