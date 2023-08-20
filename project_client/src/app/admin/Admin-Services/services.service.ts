import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient) { }

  adminLogin(data:any){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.ADMIN_LOGIN
    return this.httpClient.post(url, data)
  }

  getAllUsers(){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.GET_ALL_USERS
    return this.httpClient.get(url)
  }

  getAllProfessionals(){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.GET_ALL_PROFESSIONALS
    let Headers = {
      "Authorization": localStorage.getItem('adminToken')!
    }
    return this.httpClient.get(url, {headers:Headers})
  }

  blockUser(id:object){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.BLOCK_USER
    return this.httpClient.post(url,id)
  }

  unblockUser(id:object){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.UNBLOCK_USER
    return this.httpClient.post(url,id)
  }

  blockProfessional(id:object){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.BLOCK_PROFESSIONAL
    return this.httpClient.post(url,id)
  }

  unblockProfessional(id:object){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.UNBLOCK_PROFESSIONAL
    return this.httpClient.post(url,id)
  }


  getAdminPayload(){
    const token = localStorage.getItem('adminToken')
    console.log(token, 'token in payload');
    
    if(token){
      const adminPayload = atob(token.split('.')[1])
      console.log(adminPayload, 'success');
      return JSON.parse(adminPayload)
    }else{
      console.log('fail');
      return null
    }
   }
  
   isLoggedIn(){
    const adminPayload = this.getAdminPayload()
    if(adminPayload){
      console.log(adminPayload, 'adminPayload');
      return adminPayload.exp > Date.now() / 1000
    }else{
      console.log('fail in is log');
      
      return false
    }
   }

   appointmentLoading(){
    let url = environment.Admin.ADMIN_BASE_URL+environment.Admin.GET_APPOINTMENTS
    return this.httpClient.get(url)
   }

}
