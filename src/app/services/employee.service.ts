// // src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return new Observable<Employee>(observer => {
      observer.next(employee);
      observer.complete();
    });
  }

  deleteEmployee(id: number): Observable<void> {
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }
  
}
