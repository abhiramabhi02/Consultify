import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { json } from 'express';
import { BooleanExpression } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private httpClient: HttpClient) {}

  userRegistration(data:Object){
    let url = environment.User.USER_BASE_URL+environment.User.USER_REGISTRATION
    return this.httpClient.post(url, data)
  }

  userLogin(data:object){
    let url = environment.User.USER_BASE_URL+environment.User.USER_LOGIN
    return this.httpClient.post(url,data)
  }

  professionalListing(id:object){
    let url = environment.User.USER_BASE_URL+environment.User.PROFESSIONAL_LISTING
    let Headers = {
      "Authorization": localStorage.getItem('token')!
    }
    return this.httpClient.post(url, id, {headers:Headers})
  }

 getUserPayload(){
  const token = localStorage.getItem('token')
  if(token){
    const userPayload = atob(token.split('.')[1])
    return JSON.parse(userPayload)
  }else{
    return null
  }
 }

 isLoggedIn(){
  const userPayload = this.getUserPayload()
  if(userPayload){
    console.log(userPayload, 'userpayload');
    
    return userPayload.exp > Date.now() / 1000
  }else{
    return false
  }
 }

 proProfile(id:object){
  let url = environment.User.USER_BASE_URL+environment.User.PROFESSIONAL_PROFILE
  let Headers ={
    'Authorization': localStorage.getItem('token')!
  }
  return this.httpClient.post(url,id,{headers:Headers})
 }

 sendVerifyMail(data:object){
  let url = environment.User.USER_BASE_URL+environment.User.USER_EMAIL_VERIFY
  return this.httpClient.post(url,data)
 }


 otpVerify(data:object){
  let url = environment.User.USER_BASE_URL+environment.User.USER_OTP_VERIFY
  return this.httpClient.post(url,data)
 }

 Appointment(data:object){
  console.log('called on apointment');
  
  let url = environment.User.USER_BASE_URL+environment.User.SCHEDULE_APPOINTMENT
  let Headers = {
    'Authorization': localStorage.getItem('token')!
  }
  return this.httpClient.post(url, data, {headers:Headers})
}

getPreferences(id:object){
  let url = environment.User.USER_BASE_URL+environment.User.GET_PROFESSIONAL_PREFERENCES
  let Headers = {
    'Authorization': localStorage.getItem('token')!
  }
  return this.httpClient.post(url, id, {headers:Headers})
}

getUserProData(data:object){
  let url = environment.User.USER_BASE_URL+environment.User.GET_PRO_USER_DATA
  let Headers = {
    'Authorization': localStorage.getItem('token')!
  }
  return this.httpClient.post(url, data,{headers:Headers})
}

getUser(id:object){
  console.log('called in getuser');
  
  let url = environment.User.USER_BASE_URL+environment.User.GET_USER_DATA
  let Headers = {
    'Authorization': localStorage.getItem('token')!
  }
  return this.httpClient.post(url, id, {headers:Headers})
}

getAllAppointments(id:object){
  let url = environment.User.USER_BASE_URL+environment.User.GET_ALL_APPOINTMENT
  let Headers = {
    'Authorization' : localStorage.getItem('token')!
  }
  return this.httpClient.post(url, id, {headers:Headers})
}

confirmAppointment(id:object){
  let url = environment.User.USER_BASE_URL+environment.User.APPOINTMENT_CONFIRM
  
  return this.httpClient.post(url, id)
}

conferenceAppointment(id:object){
  let url = environment.User.USER_BASE_URL+environment.User.GET_CONFERENCE_APPOINTMENT

  return this.httpClient.post(url, id)
}


}