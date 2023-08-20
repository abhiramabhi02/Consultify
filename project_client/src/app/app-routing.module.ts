import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

import { AuthGuard } from './user/user-Auth-Guard/Auth-guard';
import { TokenGuard } from './user/user-Auth-Guard/token-Guard';
import { tokenToString } from 'typescript';
import { ProListComponent } from './user/pro-list/pro-list.component';
import { ProProfileComponent } from './user/pro-profile/pro-profile.component';
import { AppointmentComponent } from './user/appointment/appointment.component';
import { audit } from 'rxjs';
import { VerifyMailComponent } from './user/verify-mail/verify-mail.component';
import { PaymentComponent } from './user/payment/payment.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserAppointmentsComponent } from './user/user-profile/user-appointments/user-appointments.component';
import { AppointmentViewComponent } from './user/user-profile/appointment-view/appointment-view.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'userlogin', component: UserLoginComponent, canActivate:[TokenGuard]},
  {path:'userregistration', component: UserRegistrationComponent, canActivate:[TokenGuard]},
  {path:'userverifymail', component:VerifyMailComponent, canActivate:[TokenGuard]},
  {path:'userhome', component:UserHomeComponent, canActivate:[AuthGuard] },
  {path:'professionallist/:pro', component:ProListComponent, canActivate:[AuthGuard] },
  {path:'proprofile/:id', component:ProProfileComponent, canActivate:[AuthGuard]},
  {path:'bookappointment/:id', component:AppointmentComponent, canActivate:[AuthGuard]},
  {path:'profile', component:UserProfileComponent, canActivate:[AuthGuard]},
  {path:'userappointments/:id', component:UserAppointmentsComponent, canActivate:[AuthGuard]},
  {path:'payment', component:PaymentComponent, canActivate:[AuthGuard]},
  {path:'appointmentview/:id', component:AppointmentViewComponent, canActivate:[AuthGuard]}
];

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, TokenGuard]
})
export class AppRoutingModule { }
