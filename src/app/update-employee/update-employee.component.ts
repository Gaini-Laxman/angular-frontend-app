import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee!: Employee;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        console.log(data);
        this.employee = data;
      },
      error => console.error(error)
    );
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data: any) => {
        console.log(data);
        this.employee = new Employee();
        this.gotoList();
      },
      (error: any) => console.log(error)
    );
  }

  gotoList() {
    this.router.navigate(['/employee-list']); // Adjust the route based on your application
  }

  onSubmit() {
    this.updateEmployee();
  }
}
