import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path : 'dashboard', component: DashboardComponent},
  { path : 'ressources', component: RessourcesComponent},
  { path : 'schedule', component: ScheduleComponent},
  { path : 'changelog', component: ChangeLogComponent },
  { path : 'authenticate', component: AuthenticateComponent },
  { path : 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
