import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from "./auth.guard";
import {NavigationComponent} from "./navigation/navigation.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'logout', component: NavigationComponent, canActivate: [AuthGuard] },
  { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path : 'ressources', component: RessourcesComponent, canActivate: [AuthGuard]},
  { path : 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
  { path : 'changelog', component: ChangeLogComponent ,canActivate: [AuthGuard]},
  { path : 'authenticate', component: AuthenticateComponent, },
  { path : 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
