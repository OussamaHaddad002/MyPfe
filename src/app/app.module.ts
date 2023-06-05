import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule , HttpClient} from "@angular/common/http";

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { ChangeLogComponent } from './change-log/change-log.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RegisterComponent } from './register/register.component';
// import {EpicTableComponent} from "./component/epic-table.component";
// import {ActionTableComponent} from "./component/action-table.component";
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SearchBarComponent,
    DashboardComponent,
    ScheduleComponent,
    RessourcesComponent,
    ChangeLogComponent,
    AuthenticateComponent,
    RegisterComponent,
    // EpicTableComponent,
    // ActionTableComponent,
    NavigationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
