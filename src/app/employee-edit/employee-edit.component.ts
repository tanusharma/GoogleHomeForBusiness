import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  id:string = '';
  EmployeeID:string = '';
  Name:string = '';
  Designation:string = '';
  Salary:string = '';
  Experience:string = '';


  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
    this.employeeForm = this.formBuilder.group({
      'EmployeeID' : [null, Validators.required],
      'Name' : [null, Validators.required],
      'Designation' : [null, Validators.required],
      'Salary' : [null, Validators.required],
      'Experience' : [null, Validators.required]
    });
  }

  getEmployee(id) {
    this.api.getEmployee(id).subscribe(data => {
      this.id = data._id;
      this.employeeForm.setValue({
        EmployeeID: data.EmployeeID,
        Name: data.Name,
        Designation: data.Designation,
        Salary: data.Salary,
        Experience: data.Experience
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateEmployee(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/employee-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  employeeDetails() {
    this.router.navigate(['/employee-details', this.id]);
  }
}
