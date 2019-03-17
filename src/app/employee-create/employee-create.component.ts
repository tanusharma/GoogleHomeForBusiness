import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  
  employeeForm: FormGroup;
  EmployeeID:string='';
  Name:string='';
  Designation:string='';
  Salary:string='';
  Experience:string='';


  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      'EmployeeID' : [null, Validators.required],
      'Name' : [null, Validators.required],
      'Designation' : [null, Validators.required],
      'Salary' : [null, Validators.required],
      'Experience' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postEmployee(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/employee-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
