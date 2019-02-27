import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})
export class LoginFormComponent implements OnInit {
  message : string = '';
  data : any = {username:'',password:''}
  constructor(private userService:UserService, private router : Router) { }
  handlerResponse(res){
     if(!res['token']){
        this.message = res['message'];
     }else{
        this.userService.setUserToken(res['token']);
        this.router.navigateByUrl('/admin');
     }
  }
  ngOnInit() {
  }
  onLoginSubmit(username:string, password:string){
    this.data.username = username;
    this.data.password = password;
    this.userService.logIn(this.data)
    .subscribe(
      res =>{
        this.handlerResponse(res)
      },
      err => {console.log(err)}
    );
  }
}
