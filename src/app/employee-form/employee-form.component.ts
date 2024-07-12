import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, DialogModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  @Output() addEmployee = new EventEmitter<Employee>();

  @Output() closedModal = new EventEmitter<boolean>()

  employeeForm: FormGroup;
  @Input()showDialog : boolean = true
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      imageUrl: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.showDialog)
  }

  hideModal(){
    console.log("hiding element")
    this.closedModal.emit(true)
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.addEmployee.emit(this.employeeForm.value);
      this.employeeForm.reset();
    }
  }
}


