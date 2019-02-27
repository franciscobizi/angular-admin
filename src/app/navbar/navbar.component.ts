import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  navshow:boolean = true;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  // logout user from app
  onLogOut(){
    this.userService.deleteUserToken();
    this.router.navigateByUrl('/');
  }
}
