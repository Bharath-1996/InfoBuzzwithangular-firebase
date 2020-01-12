import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email:string;
  password:string;
  constructor(public auth:AuthService,private afauth:AngularFireAuth) { }

  ngOnInit() {
  }
  login()
{
  this.auth.login(this.email,this.password);
   this.email=this.password='';
}
resetpassword()
{
  if (!this.email) 
  { 
    alert('Type in your email first'); 
  }
  else
  {
    this.auth.resetpassword(this.email);
  }
}
}
