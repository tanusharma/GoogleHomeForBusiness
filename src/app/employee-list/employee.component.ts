import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SocketService } from '../shared/services/socket.service';

import { Action } from '../shared/model/action';
import { Event } from '../shared/model/event';
import { Message } from '../shared/model/message';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any;
  employeesFilterObj: any;
  //Ex: { $or: [{ author: "Charles Dickens" }, { author: "Agatha Christie" }] }
  ioConnection: any;
  messages: Message[] = [];
  messageContent: string;
  queryText: string = "initial";
  displayedColumns = ['EmployeeID', 'Name', 'Designation','Salary'];
  dataSource = new EmployeeDataSource(this.api);

  constructor(private api: ApiService, private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
    //this.employeesFilterObj = { $or: [{ author: "Charles Dickens" }, { author: "Yahoo" }] };
    //this.getFilteredEmployeesList(this.employeesFilterObj);
    //initial get all employees
    this.api.getEmployees()
      .subscribe(res => {
        console.log(res);
        this.employees = res;
        //this.initIoConnection();
      }, err => {
        console.log(err);
      });
  }

  private getFilteredEmployeesList(filter): void {
    this.api.getEmployeesByFilter(filter)
      .subscribe(res => {
        console.log(res);
        this.employees = res;
        //this.initIoConnection();
      }, err => {
        console.log(err);
      });
  }


  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: any) => {
        switch (message.intent) {
          case "Filter Employees":
          this.employeesFilterObj = { $or: [] };
          message.parameters.empName.forEach((Name) => {
            this.employeesFilterObj['$or'].push({Name: Name})
          });
          this.queryText=message.query;
          this.getFilteredEmployeesList(this.employeesFilterObj);
          console.log(this.employeesFilterObj);
            break;
          default:
          //do nothing
        }

      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }
}

//ignoring below class use till we get better understanding of angular amterial table or change approach
export class EmployeeDataSource extends DataSource<any> {
  //employeesFilterObj: any;
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getEmployees();
  }

  disconnect() {

  }
}
