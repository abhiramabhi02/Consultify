import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-Services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm!: FormGroup
  professionalId:String = ''
  Preferences:any
  selectedDate:any
  dayOfWeek:any
  userId:any
  message:String =''
  errorMessage:String =''
  data:any
  today: Date = new Date();
  currentWeekStart: any;
  currentWeekEnd: any;
 

  timeSlots: string[] = []

  // professionOptions = [
  //   { value: null, label: 'Select your profession' },
  //   { value: 'Doctor', label: 'Doctor' },
  //   { value: 'Chartered Accountant', label: 'Chartered Accountant' },
  //   { value: 'Lawyer', label: 'Lawyer' },
  //   { value: 'Teacher', label: 'Teacher' },
  // ];

  constructor(private service:UserServicesService,
    private router:Router,
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute ){}

  ngOnInit(): void {

    // Calculate the current week's start and end dates
    const currentDay = this.today.getDay(); // 0 (Sunday) to 6 (Saturday)
    this.currentWeekStart = new Date(this.today);
    this.currentWeekStart.setDate(this.today.getDate() - currentDay);
    this.currentWeekEnd = new Date(this.currentWeekStart);
    this.currentWeekEnd.setDate(this.currentWeekStart.getDate() + 6);

    this.createForm()
    this.getParam()
    this.getUserId()
    this.getPreference()
  }

  getParam(){
    this.activatedRoute.params.subscribe((params)=>{
      this.professionalId = params['id']
      console.log(this.professionalId, 'id');
    })
  }

  getUserId(){
    let token = localStorage.getItem('token')!
    const userPayload:any = atob(token.split('.')[1])
    const user = JSON.parse(userPayload)
    this.userId = user.userId
    console.log(user.userId,'userpayload');
  }

  getPreference(){
   let data ={
      id:this.professionalId
    }
    this.service.getPreferences(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.Preferences = response.preference
        
      }
    })
  }
  // onDateChanged() {
  //   const selectedDate = this.appointmentForm.get('date')!.value;
  //   const selectedTime = this.appointmentForm.get('time')!.value

  //   console.log(this.Preferences.Time, 'time st');
  //   console.log(this.Preferences.Endtime, 'time en');

  //   this.SelectedDateTime = new Date(selectedDate+ 'T' +selectedTime)
  //   console.log(this.SelectedDateTime, 'seele');
    
  //   // Parse the selected date and get the day of the week
  //   const date = new Date(selectedDate);
  //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   this.dayOfWeek = daysOfWeek[date.getDay()];

  //    this.isSelectedDayPreferred = this.Preferences.Day.includes(this.dayOfWeek);
  //    const startTime = new Date(selectedDate + 'T' + this.Preferences.Time);
  //    console.log(startTime, 'str');
     
  //    const endTime = new Date(selectedDate + 'T' + this.Preferences.Endtime);
  //    console.log(endTime, 'end');
     
  //    this.isTimeInRange = this.SelectedDateTime >= startTime && this.SelectedDateTime <= endTime;
  //   console.log(this.SelectedDateTime , startTime , this.SelectedDateTime , endTime, 'compare');
    
  //   console.log("Is selected day preferred?", this.isSelectedDayPreferred);
  //   console.log("Is selected time preferred?", this.isTimeInRange);
  // }

  onDateChange(){
    const date = this.appointmentForm.get('appointmentDate')?.value
    let selectedDate = new Date(date) 
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDay = daysOfWeek[selectedDate.getDay()]
    const selectedDaySlots = this.Preferences.Availability[selectedDay].timeSlots ;
    this.timeSlots = selectedDaySlots
    console.log(selectedDaySlots , 'sele');
    
  }

  dayChange(){
    const selectedDate = new Date(this.appointmentForm.value.appointmentDate);
    const selectedDay = selectedDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Unlock the week for date selection if it's Sunday
    if (selectedDay === 0) {
      this.currentWeekEnd = new Date(selectedDate);
      this.currentWeekEnd.setDate(selectedDate.getDate() + 6);
    }

    // Restrict date selection for the current week
    if (selectedDate < this.currentWeekStart || selectedDate > this.currentWeekEnd) {
      this.appointmentForm.patchValue({
        appointmentDate: null
      });
    }
  }

 

  createForm(){
    this.appointmentForm =  this.fb.group({
      appointmentDate:[null, Validators.required],
      timeSlot:[null, Validators.required]
    })
  }

  getData(){
    // console.log(this.appointmentForm.value, 'date and time');
      let date = new Date()
      let bookingDatestr:string = date.toISOString();
      let bookingDate = bookingDatestr.split('T')[0]
   
         this.data = {
            bookingDate:bookingDate,
            date:this.appointmentForm.value.appointmentDate,
            time:this.appointmentForm.value.timeSlot, 
            proId:this.professionalId,
            userId:this.userId,
            status:'Pending'
          }
          console.log( this.data, 'data'); 
          this.service.Appointment(this.data).subscribe((response:any)=>{
            console.log(response);
            if(response.success){
              Swal.fire('Success!', 'Your appointment is scheduled', 'success')
              setTimeout(()=>{
                this.router.navigate(['/profile'])
              },800)
              
            }
          })
   
  }
  
}
