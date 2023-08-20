import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-header',
  templateUrl: './pro-header.component.html',
  styleUrls: ['./pro-header.component.css']
})
export class ProHeaderComponent implements DoCheck {
 
  logoutbtn = false

  constructor(private router:Router){}


ngDoCheck(): void {
  this.logoutbt()
}

logoutbt(){
 let token = localStorage.getItem('proToken')
  if(token){
    this.logoutbtn = true
  }else{
    this.logoutbtn = false
  } 
}
  logOut(){
    let logout = localStorage.removeItem('proToken')
    this.router.navigate(['/professionalLogin'])
  }
}
