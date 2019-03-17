import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee-list/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketService } from './shared/services/socket.service';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";

const appRoutes: Routes = [
  {
    path: 'employees',
    component: EmployeeComponent,
    data: { title: 'Employee List' }
  },
  {
    path: 'employee-details/:id',
    component: EmployeeDetailComponent,
    data: { title: 'Employee Details' }
  },
  {
    path: 'employee-create',
    component: EmployeeCreateComponent,
    data: { title: 'Create Employee' }
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeEditComponent,
    data: { title: 'Edit Employee' }
  },
  { path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
