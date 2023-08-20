// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServicesService } from '../Admin-Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, 
    private service:ServicesService) {}

  canActivate(): boolean {
    const logged = this.service.isLoggedIn()
    console.log(logged, 'logged in admin');
    
    if(!logged) {
      // User is logged in
      console.log('123');
      this.router.navigate(['/adminlogin'])
      return false; // Prevents accessing the route that requires authentication
    } else {
      console.log('456');  
      // User is not logged in, allow accessing the route
      return true;
    }
  }
}
