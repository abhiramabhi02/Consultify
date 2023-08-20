// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServicesService } from '../user-Services/user-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private service:UserServicesService) {}

  canActivate(next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    

    if (!this.service.isLoggedIn()) {
     
      console.log('123');
      this.router.navigate(['/userlogin'])
      return false; 
    } else {
      
      console.log('456');
      return true;  
    }
  }
}
