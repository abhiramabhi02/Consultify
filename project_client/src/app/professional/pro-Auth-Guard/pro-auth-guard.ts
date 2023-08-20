// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServicesService } from '../professional-service/services.service';
import { Observable } from 'rxjs';
import { ListFormat } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class ProAuthGuard implements CanActivate {

  constructor(private router: Router, 
    private service:ServicesService) {}

  canActivate(next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      const logged = this.service.isLoggedIn()
      console.log(logged, 'log');
      

      if (!logged) {
     
        console.log('123');
        this.router.navigate(['/professionalLogin'])
        return false; 
      } else {
        
        console.log('456');
        return true;  
      }
   
  }
}
