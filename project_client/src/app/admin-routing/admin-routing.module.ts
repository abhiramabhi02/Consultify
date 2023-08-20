import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminUsersComponent } from '../admin/admin-users/admin-users.component';
import { AdminProfessionalsComponent } from '../admin/admin-professionals/admin-professionals.component';
import { AdminAuthGuard } from '../admin/admin-Auth-Guard/admin-auth-guard';
import { adminTokenGuard } from '../admin/admin-Auth-Guard/admin-token-guard';
import { AppointmentComponent } from '../user/appointment/appointment.component';
import { AppointmentsComponent } from '../admin/appointments/appointments.component';
import { ViewDetailsComponent } from '../admin/appointments/view-details/view-details.component';

const routes: Routes = [
  {path:'adminlogin', component:AdminLoginComponent, canActivate:[adminTokenGuard]},
  {path:'admin', component:AdminComponent, canActivate:[AdminAuthGuard], children:[
    {path:'admindashboard', component:AdminDashboardComponent, canActivate:[AdminAuthGuard]},
    {path:'adminusers', component:AdminUsersComponent, canActivate:[AdminAuthGuard]},
    {path:'adminprofessionals', component:AdminProfessionalsComponent, canActivate:[AdminAuthGuard] },
    {path:'adminappointments', component:AppointmentsComponent, canActivate:[AdminAuthGuard]},
    {path:'adminappointments/viewdetails/:id', component:ViewDetailsComponent, canActivate:[AdminAuthGuard]}
  ]},
  // {path:'adminusers', component:AdminUsersComponent, canActivate:[AdminAuthGuard]},
  // {path:'adminprofessionals', component:AdminProfessionalsComponent, canActivate:[AdminAuthGuard] }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
