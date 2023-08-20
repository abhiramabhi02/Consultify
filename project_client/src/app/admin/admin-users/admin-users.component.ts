import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Admin-Services/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any


  constructor(private service:ServicesService, 
    private router:Router,
    ){}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.service.getAllUsers().subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.users = response.users
      }
      console.log(this.users, 'user details');
      
    })
  }

  confirmBlock(userId: string): void {
    if (window.confirm('Are you sure you want to block this user?')) {
      // Call the blockuser method or any other logic
      this.blockuser(userId);
    }
  }

  blockuser(id:any){
    console.log(id, 'id');
   let data = {
      ID:id
    }
    
    this.service.blockUser(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        window.location.reload()
      }
      
    })
  }


  confirmUnblock(userId: string): void {
    if (window.confirm('Are you sure you want to unblock this user?')) {
      // Call the unblockuser method or any other logic
      this.unblockuser(userId);
    }
  }
  unblockuser(id:any){
    console.log(id, 'id');
    let data = {
      ID:id
    }
    this.service.unblockUser(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        window.location.reload()
      }   
    })
  }

 
}
