import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ServicesService } from '../professional-service/services.service';

@Injectable({
  providedIn: 'root',
})
export class ProTokenGuard implements CanActivate {
  constructor(private router: Router, private service: ServicesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    
    let logged = this.service.isLoggedIn()

    console.log(logged);
    

    if(!logged){
      console.log('not loggedin');
      return true
      
    }else{
      console.log('logged in');
      this.router.navigate(['/professionalDashboard'])
      return false
      
    }
  }
}
