import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private routes: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAdmin()
  }

  isAdmin() {
    let admin = this.routes
    if(admin){
      this.router.navigate(['/admin/admindashboard'])
    }
    
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/adminlogin']);
  }
}
