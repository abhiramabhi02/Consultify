import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements DoCheck {

  logoutbtn = false

  constructor(private router:Router){}


ngDoCheck(): void {
  this.logoutbt()
}

logoutbt(){
 let token = localStorage.getItem('token')
  if(token){
    this.logoutbtn = true
  }
}


logout(){
  localStorage.removeItem('token')
  this.router.navigate(['/userlogin'])
}

}
