import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { ObjectId } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpclient:HttpClient) { }

  professionalReg(data:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+ environment.Professional.PROFESSIONAL_REGISTRATION
    return this.httpclient.post(url, data)
  }

  professionalLogin(data:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_LOGIN
    return this.httpclient.post(url,data)
  }

  professionalVerifyMail(data:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_MAIL_VERIFICATION
    return this.httpclient.post(url,data )
  }

  professionalVerifyOtp(data:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_VERIFY_OTP
    return this.httpclient.post(url,data)
  }


  getProPayload(){
    const token = localStorage.getItem('proToken')
    console.log(token, 'token in payload');
    
    if(token){
      const proPayload = atob(token.split('.')[1])
      console.log(proPayload, 'success');
      
      return JSON.parse(proPayload)
    }else{
      console.log('fail');
      
      return null
    }
   }
  
   isLoggedIn(){
    const proPayload = this.getProPayload()
    if(proPayload){
      console.log(proPayload, 'proPayload');
      
      return proPayload.exp > Date.now() / 1000
    }else{
      console.log('fail in is log');
      
      return false
    }
   }

   loadProfessionalDashboard(id:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_DASHBOARD
    let Headers = {
      'Authorization' : localStorage.getItem('proToken')!
    }
    return this.httpclient.post(url, id, {headers:Headers})
   }

   preferencesUpdate(data:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_PREFERENCES
    let Headers = {
      'Authorization' : localStorage.getItem('proToken')!
    }
    return this.httpclient.post(url, data, {headers:Headers})
   }

   professionalAppointments(id:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_APPOINTMENTS
    
    return this.httpclient.post(url, id)
   }

   confirmAppointment(id:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.PROFESSIONAL_CONFIRM
    
    return this.httpclient.post(url, id)
   }

   cancelAppointment(id:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.APPOINTMENT_CANCEL

    return this.httpclient.post(url, id)
   }

   conferenceAppointment(id:object){
    let url = environment.Professional.PROFESSIONAL_BASE_URL+environment.Professional.GET_CONFERENCE_APPOINTMENT

    return this.httpclient.post(url, id)
   }

}


