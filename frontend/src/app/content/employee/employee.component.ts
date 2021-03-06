import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  noProfile = false;
  noContract = false;

  first_name = "";
  last_name = "";
  employeeData = {};
  contractData = {};
  workpermitData = {};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUser()
      .subscribe(
        data => {
          this.first_name = data['first_name'];
          this.last_name = data['last_name'];
        },
        err => console.error(err)
      );
    this.apiService.getEmployee()
      .subscribe(
        data => this.employeeData = data,
        err => {
          if (err.status == 404) {
            this.noProfile = true;
          }
        }
      );
    this.apiService.getContract()
      .subscribe(
        data => {
          this.contractData = {
            'job_title': data['job_title'],
            'dc_type': data['dc_type'],
            'wage': data['wage'],
            'salary_struct': data['salary_struct'],
            'tp_duration_begin': data['tp_duration_begin'],
            'tp_duration_end': data['tp_duration_end'],
            'schedule': data['schedule'],
            'pay_schedule': data['pay_schedule']
          };
          this.workpermitData = {
            'visa_no': data['visa_no'],
            'visa_expiry': data['visa_expiry'],
            'work_permit_no': data['work_permit_no']
          };
        },
        err => {
          if (err.status == 404) {
            this.noContract = true;
          }
        }
      )
  }

}
