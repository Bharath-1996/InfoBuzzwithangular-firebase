import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee;

  constructor(private firestore:AngularFirestore) { }
  getEmployees()
  {
    return this.firestore.collection('employees').snapshotChanges();
  }
  getEmployeesbyid()
  {
    return this.firestore.collection('employees').doc('3OU7Hd92dwd9zBCS7Lanl82645k2').snapshotChanges();
  }
  populateform(emp)
  {
    this.formData.email=emp.email;
    this.formData.empCode=emp.empCode;
    this.formData.fullName=emp.fullName;
    this.formData.mobile=emp.mobile;
    this.formData.id=emp.id;
    this.formData.position=emp.position;
  }
  
}
