import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SocketService } from '../shared/services/socket.service';

import { Action } from '../shared/model/action';
import { Event } from '../shared/model/event';
import { Message } from '../shared/model/message';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  booksFilterObj: any;
  //Ex: { $or: [{ author: "Charles Dickens" }, { author: "Agatha Christie" }] }
  ioConnection: any;
  messages: Message[] = [];
  messageContent: string;
  queryText: string = "initial";
  displayedColumns = ['EmployeeID', 'Name', 'Designation','Salary'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService, private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
    //this.booksFilterObj = { $or: [{ author: "Charles Dickens" }, { author: "Yahoo" }] };
    //this.getFilteredBooksList(this.booksFilterObj);
    //initial get all books
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
        //this.initIoConnection();
      }, err => {
        console.log(err);
      });
  }

  private getFilteredBooksList(filter): void {
    this.api.getBooksByFilter(filter)
      .subscribe(res => {
        console.log(res);
        this.books = res;
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
          this.booksFilterObj = { $or: [] };
          message.parameters.empName.forEach((Name) => {
            this.booksFilterObj['$or'].push({Name: Name})
          });
          this.queryText=message.query;
          this.getFilteredBooksList(this.booksFilterObj);
          console.log(this.booksFilterObj);
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
export class BookDataSource extends DataSource<any> {
  //booksFilterObj: any;
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}
