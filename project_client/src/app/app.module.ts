import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { ProfessionalRoutingModule } from './professional/professional-routing/professional-routing.module';
import { CacheInterceptor } from './user/user-Auth-Guard/cache-interceptor';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProfessionalComponent } from './professional/professional.component';
import { AdminComponent } from './admin/admin.component';
import { UserHeaderComponent } from './user/user-header/user-header.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { ProHeaderComponent } from './professional/pro-header/pro-header.component';
import { ProLoginComponent } from './professional/pro-login/pro-login.component';
import { ProRegistrationComponent } from './professional/pro-registration/pro-registration.component';
import { ProDashboardComponent } from './professional/pro-dashboard/pro-dashboard.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProfessionalsComponent } from './admin/admin-professionals/admin-professionals.component';
import { ProForgotPasswordComponent } from './professional/pro-forgot-password/pro-forgot-password.component';
import { ProVerifymailComponent } from './professional/pro-verifymail/pro-verifymail.component';
import { ProListComponent } from './user/pro-list/pro-list.component';
import { ProProfileComponent } from './user/pro-profile/pro-profile.component';
import { AppointmentComponent } from './user/appointment/appointment.component';
import { VerifyMailComponent } from './user/verify-mail/verify-mail.component';
import { PaymentComponent } from './user/payment/payment.component';
import { EditPreferencesComponent } from './professional/edit-preferences/edit-preferences.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { ViewDetailsComponent } from './admin/appointments/view-details/view-details.component';
import { ViewAppointmentsComponent } from './professional/pro-dashboard/view-appointments/view-appointments.component';
import { ConferenceComponent } from './professional/pro-dashboard/conference/conference.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserAppointmentsComponent } from './user/user-profile/user-appointments/user-appointments.component';
import { AppointmentViewComponent } from './user/user-profile/appointment-view/appointment-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfessionalComponent,
    AdminComponent,
    UserHeaderComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserHomeComponent,
    ProHeaderComponent,
    ProLoginComponent,
    ProRegistrationComponent,
    ProDashboardComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    LandingPageComponent,
    AdminUsersComponent,
    AdminProfessionalsComponent,
    ProForgotPasswordComponent,
    ProVerifymailComponent,
    ProListComponent,
    ProProfileComponent,
    AppointmentComponent,
    VerifyMailComponent,
    PaymentComponent,
    EditPreferencesComponent,
    BackButtonComponent,
    AppointmentsComponent,
    ViewDetailsComponent,
    ViewAppointmentsComponent,
    ConferenceComponent,
    UserProfileComponent,
    UserAppointmentsComponent,
    AppointmentViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    ProfessionalRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FullCalendarModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
