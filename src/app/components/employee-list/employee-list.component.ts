import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, EmployeeFormComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  filterValue: string = '';
  showAddForm = false

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      },
      error => {
        console.error('Error fetching employees', error);
       
      }
    );
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = [...this.employees];
    });
  }

  deleteEmployee(id: number) {
    let employeeToDeleteIndexFromEmp = this.filteredEmployees.findIndex(x => x.id == id)
    let employeeToDeleteIndexFromFiltred = this.filteredEmployees.findIndex(x => x.id == id)

    if(employeeToDeleteIndexFromFiltred != -1){
      this.filteredEmployees.splice(employeeToDeleteIndexFromFiltred,1)
    }

    if(employeeToDeleteIndexFromEmp != -1){
      this.employees.splice(employeeToDeleteIndexFromEmp,1)
    }
  }

  refreshList(data : any){
    if(data){
      this.employees.push(data)
      this.filteredEmployees.push(data)
      this.showAddForm = false
    }
  }

  applyFilter() : void {
    this.filterValue = this.filterValue.trim().toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.age.toString().indexOf(this.filterValue) != -1 ||
      employee.dob.toString().indexOf(this.filterValue)  != -1 ||
      employee.email.toLowerCase().indexOf(this.filterValue) != -1 ||
      employee.salary.toString().indexOf(this.filterValue)  != -1 ||
      employee.address?.toLowerCase().indexOf(this.filterValue) != -1 ||
      employee.imageUrl.toLocaleLowerCase().indexOf(this.filterValue)  != -1 ||
      employee.firstName.toLowerCase().indexOf(this.filterValue) != -1 ||
      employee.lastName.toLowerCase().indexOf(this.filterValue) != -1||
      employee.contactNumber.toString().indexOf(this.filterValue)
    );
  }

  onInputChange(event: Event): void {
    
    const target = event.target as HTMLInputElement;
    if (target) {
      this.filterValue = target.value; 
    }
  }
  
  sortTableByColumn(columnName: keyof Employee) {
    let descending = true;
    

    if (this.filteredEmployees.length > 1) {
      const firstValue = this.filteredEmployees[0][columnName];
      const lastValue = this.filteredEmployees[this.filteredEmployees.length - 1][columnName];
      if (firstValue !== lastValue) {
        descending = firstValue < lastValue;
      }
    }
  
    this.filteredEmployees.sort((a, b) => {
      let valA = a[columnName];
      let valB = b[columnName];
  
      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toUpperCase();
        valB = valB.toUpperCase();
      }
      
      if (typeof valA === 'number' && typeof valB === 'number') {
        return descending ? valB - valA : valA - valB;
      }
  
     if (valA < valB) {
        return descending ? 1 : -1;
      } else if (valA > valB) {
        return descending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
  

  clearFilter() {
    this.filteredEmployees = [...this.employees];
  }

  trackByFn(index: number, employee: Employee) {
    return employee.id; 
  }

  hideModal(){
    this.showAddForm = false
  }
  isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
}