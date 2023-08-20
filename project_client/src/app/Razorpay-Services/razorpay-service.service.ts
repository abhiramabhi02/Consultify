import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RazorpayServiceService {

  constructor(private httpclient:HttpClient) { }

  createOrder(data:object){
    let url = environment.User.USER_BASE_URL+environment.Razorpay.CREATE_ORDER
    return this.httpclient.post(url, data)
  }

  verifyPayment(data:object){
    let url = environment.User.USER_BASE_URL+environment.Razorpay.PAYMENT_VERIFY
    return this.httpclient.post(url, data)
  }
}
