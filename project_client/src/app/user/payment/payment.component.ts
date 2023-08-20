import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../user-Services/user-services.service';
import { response } from 'express';
import { RazorpayServiceService } from 'src/app/Razorpay-Services/razorpay-service.service';
import { an } from '@fullcalendar/core/internal-common';
import Swal from 'sweetalert2'

declare var Razorpay: any


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  appointmentData: any;
  userData: any;
  proData: any;
  bookingDate: String = ''
  date: String = ''
  currency: string = 'INR'

  


  constructor(
    private route: ActivatedRoute,
    private service: UserServicesService,
    private router:Router,
    private razorpayService:RazorpayServiceService,

  ) {}

  ngOnInit(): void {
    this.dataRetrieval();
    // this.getAllData();
  }

  dataRetrieval() {
    this.route.queryParams.subscribe((params: any) => {
      this.appointmentData = params
      
      console.log(this.appointmentData, 'appoint data');

       this.date =  this.appointmentData.Date.split('T')[0]
       this.bookingDate = this.appointmentData.BookingDate.split('T')[0]
    });
  }


  initiatePayment(){
    const orderDetails = {
      amount: this.appointmentData.Payment,
      currency: this.currency,
    }
    this.razorpayService.createOrder(orderDetails).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.initiateRazorpayCheckout(response)
      }
    })
  }

  initiateRazorpayCheckout(data:any){
    

    const options = {
      key:'rzp_test_ABHCKQGb2XYM0D',
      amount:data.response.amount,
      currency:data.response.currency,
      name:'Consultify',
      description:'Professional Consultation',
      order_id: data.response.id,
      handler: (response:any)=>{
        this.paymentVerify(response)
      },
      prefill:{
        email:'customer@gmail.com',
        contact:'2398745610'
      }
    }

    console.log(options, 'options');
    
    const rzp = new Razorpay(options);
    rzp.open();
  }

  paymentVerify(response:any){
    const paymentDetails = {
      payment_id: response.razorpay_payment_id,
      order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature
    }

    this.razorpayService.verifyPayment(paymentDetails).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.confirmed()
          Swal.fire('Success!', 'Your payment is Success.', 'success')
          this.router.navigate(['/profile'])
      }else{
        Swal.fire('Failed', 'Your payment is failed.', 'error')
      }
      
    })
  }

  confirmed(){
    let data ={
      id:this.appointmentData._id
    }
    this.service.confirmAppointment(data).subscribe((respone:any)=>{
      console.log(respone);
      
    })  
  }



  // getAllData() {
  //   let data = {
  //     userId: this.appointmentData.userId,
  //     proId: this.appointmentData.proId,
  //   };
  //   this.service.getUserProData(data).subscribe((respone: any) => {
  //     console.log(respone);
  //     if (respone.success) {
  //       this.userData = respone.user;
  //       this.proData = respone.pro;

  //       console.log(this.userData, this.proData, 'user pro data');
  //     }
  //   });
  // }

  // confirmAppointment(){
  //   let data = {
  //     userId:this.appointmentData.userId,
  //     proId:this.appointmentData.proId,
  //     bookingDate:this.appointmentData.bookingDate,
  //     date:this.appointmentData.date,
  //     time:this.appointmentData.time,
  //     fees:500,
  //     status:'Scheduled'
  //   }

  //   this.service.Appointment(data).subscribe((response:any)=>{
  //     console.log(response);
  //     if(response.success){
  //       // this.router.navigate(['/userhome'])
  //     }
  //   })
  // }
}
