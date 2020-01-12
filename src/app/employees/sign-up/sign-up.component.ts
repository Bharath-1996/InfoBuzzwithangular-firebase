import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from 'src/app/shared/employee.model';
import { format } from 'url';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
  password:string;
  
  constructor(public auth:AuthService,private firestore:AngularFirestore) { }
  ngOnInit() {
  }
signup()
{
  this.auth.signup(this.email,this.password);
  this.email=this.password='';
}
}
