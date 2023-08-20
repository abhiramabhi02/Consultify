import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-Services/user-services.service';


@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

    constructor(private router:Router,
      private service:UserServicesService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean>{

    let logged = this.service.isLoggedIn()

    if(!logged){
      console.log('not loggedin');
      return true
      
    }else{
      console.log('logged in');
      this.router.navigate(['/userhome'])
      return false
      
    }
    
  }

}
