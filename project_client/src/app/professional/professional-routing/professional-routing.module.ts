import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProLoginComponent } from '../pro-login/pro-login.component';
import { ProRegistrationComponent } from '../pro-registration/pro-registration.component';
import { ProDashboardComponent } from '../pro-dashboard/pro-dashboard.component';
import { ProForgotPasswordComponent } from '../pro-forgot-password/pro-forgot-password.component';
import { ProVerifymailComponent } from '../pro-verifymail/pro-verifymail.component';
import { ProAuthGuard } from '../pro-Auth-Guard/pro-auth-guard';
import { ProTokenGuard } from '../pro-Auth-Guard/pro-token-guard';
import { EditPreferencesComponent } from '../edit-preferences/edit-preferences.component';
import { ViewAppointmentsComponent } from '../pro-dashboard/view-appointments/view-appointments.component';
import { ConferenceComponent } from '../pro-dashboard/conference/conference.component';

const routes: Routes = [
  {path:'professionalLogin', component:ProLoginComponent, canActivate:[ProTokenGuard]},
  {path:'professionalRegistration', component:ProRegistrationComponent, canActivate:[ProTokenGuard]},
  {path:'professionalDashboard', component:ProDashboardComponent, canActivate:[ProAuthGuard]},
  {path:'forgotPassword', component:ProForgotPasswordComponent},
  {path:'verifyMail', component:ProVerifymailComponent},
  {path:'editpreferences/:id', component:EditPreferencesComponent, canActivate:[ProAuthGuard] },
  {path:'viewappointments/:id', component:ViewAppointmentsComponent, canActivate:[ProAuthGuard]},
  {path:'viewappointmentdetails/:id', component:ConferenceComponent, canActivate:[ProAuthGuard]}
];   

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
  
})
export class ProfessionalRoutingModule { }
