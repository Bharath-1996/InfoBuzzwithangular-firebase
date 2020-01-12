import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { SignInComponent } from './employees/sign-in/sign-in.component';
import { SignUpComponent } from './employees/sign-up/sign-up.component';
import { AuthGuard } from './shared/auth.guard';
import { EmployeeListsComponent } from './employees/employee-lists/employee-lists.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { ProfileComponent } from './employees/profile/profile.component';

const routes:Routes=[
  { path: '', redirectTo:'/sign-in',pathMatch:'full'},
  //{ path: 'main', component:EmployeeListComponent,canActivate:[AuthGuard]},
  { path: 'main', component:EmployeeListsComponent,canActivate:[AuthGuard]},
  //{ path: 'main', component:EmployeeComponent,canActivate:[AuthGuard]},
  { path: 'sign-in', component:SignInComponent},
  { path: 'sign-up', component:SignUpComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'profile/edit', component:ProfileComponent},
 ]

 @NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
