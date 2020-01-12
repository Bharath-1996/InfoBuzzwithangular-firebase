import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }
  isloggedin()
  {
      
      let user =sessionStorage.getItem('token')
      return !(user === null)     
  }
  Logout()
{
  this.auth.Logout();
}
}
