import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  user = {username : ''};
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {this.user.username = this.ucfirst(res['user']['user']['username'])},
      err => {
        {console.log(err);}
      }
    );
  }

  /**
   * 
   * @param name
   * @return string | string with first character uppercase 
   */
  ucfirst(name : string ){
      var f = name.charAt(0).toUpperCase();
      return f + name.substr(1, name.length-1);
  }

}
