import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../professional-service/services.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit-preferences',
  templateUrl: './edit-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css'],
})
export class EditPreferencesComponent {
  // preferenceForm!: FormGroup;
  // preference: any;
  // proId: any;
  // daysOfWeek = [
  //   { value: 'Sunday', label: 'Sunday' },
  //   { value: 'Monday', label: 'Monday' },
  //   { value: 'Tuesday', label: 'Tuesday' },
  //   { value: 'Wednesday', label: 'Wednesday' },
  //   { value: 'Thursday', label: 'Thursday' },
  //   { value: 'Friday', label: 'Friday' },
  //   { value: 'Saturday', label: 'Saturday' },
  // ];

  // constructor(
  //   private service: ServicesService,
  //   private fb: FormBuilder,
  //   private routes: ActivatedRoute
  // ) {}

  // ngOnInit(): void {
  //   this.createForm();
  //   this.getId();
  // }

  // getId() {
  //   let id = this.routes.params.subscribe((params) => {
  //     this.proId = params['id'];
  //     console.log(this.proId, 'proid');
  //   });
  // }

  // createForm() {
  //   this.preferenceForm = this.fb.group({
  //     daysOfWeek: this.fb.array(
  //       this.daysOfWeek.map(() => this.fb.control(false))
  //     ),
  //     startTime: ['', Validators.required],
  //     endTime: ['', Validators.required],
  //   });
  // }

  // getDayFormControl(index: number) {
  //   return (this.preferenceForm.get('daysOfWeek') as FormArray).controls[
  //     index
  //   ] as FormControl;
  // }

  // getPreference() {
  //   console.log(this.preferenceForm.value);
  //   const selectedDays = this.daysOfWeek
  //     .filter((day, index) => this.getDayFormControl(index).value)
  //     .map((day) => day.value);
  //   console.log(selectedDays, 'sele');

  //   const data = {
  //     id: this.proId,
  //     days: selectedDays,
  //     start: this.preferenceForm.value.startTime,
  //     end: this.preferenceForm.value.endTime,
  //   };
  //   this.service.preferencesUpdate(data).subscribe((response: any) => {
  //     console.log(response);
  //   });
  // }




  // latee
  // 
  

  //latee

  availabilityForm!: FormGroup;
  days: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timeSlots: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', /* Add more time slots */];
  proId: any;

  constructor(private fb: FormBuilder,
     private service:ServicesService,
      private routes:ActivatedRoute,
      private router:Router) {}

  ngOnInit() {
    // Initialize the form with default values if needed
    const formControls = this.days.reduce((controls, day) => {
      controls[day] = this.fb.group({}); // Create an empty form group for each day
      this.timeSlots.forEach((timeSlot) => {
        controls[day].addControl(timeSlot, this.fb.control(false)); // Add form control for each time slot
      });
      return controls;
    }, {});
  
    this.availabilityForm = this.fb.group(formControls);

    this.getId()
  }

   getId() {
    let id = this.routes.params.subscribe((params) => {
      this.proId = params['id'];
      console.log(this.proId, 'proid');
    });
  }

  // Helper method to get the form control for a specific day and time slot
  getControl(day: string, timeSlot: string): FormControl {
    return this.availabilityForm.get(day)!.get(timeSlot) as FormControl;
  }

  // Method to handle form submission
  onSubmit() {
    // Process the form data and save preferences to the server
    const formData = this.availabilityForm.value;
    console.log(formData);
    let data = {
      form : formData,
      id: this.proId
    }
    this.service.preferencesUpdate(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.router.navigate(['/professionalDashboard'])
      }
    })
  }
}
