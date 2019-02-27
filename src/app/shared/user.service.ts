import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, from } from 'rxjs';
import {UserModule} from '../shared/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    users: UserModule = {
       username:'',
       password:''
    };
 
    private API_URL : string = environment.BASE_URL;

    noAuth = {headers : new HttpHeaders({'NoAuth' : 'True'})};

    constructor(private http: HttpClient) { }

    /**
     * registe new user
     * @param user 
     */
    signUp(user: UserModule) {
      return this.http.post(this.API_URL + '/users/signup', user, this.noAuth);
    }

    /**
     * authenticate user application
     * @param credentials 
     */
    logIn(credentials:any) {
        return this.http.post(this.API_URL + '/users/login', credentials, this.noAuth);
    }

    /**
     * set user token
     * @param token 
     */
    setUserToken(token : string){
      localStorage.setItem('token', token);
    }

    /**
     * get user token
     * @return string | user token
     */
    getUserToken(){
      return localStorage.getItem('token');
    }

    /**
     * get user token
     * @return json | user data 
     */
    getUserPayload(){
      var token = this.getUserToken();
      if(token){
        var userdata = atob(token.split('.')[1]);
        return JSON.parse(userdata);
      }else{
        return null;
      }
    }
    
    /**
     * get user profile by sending request
     */
    getUserProfile(){
       return this.http.get(environment.BASE_URL + '/users/me');
    }
    
    /**
     * Remove user token
     * @return void 
     */
    deleteUserToken(){
      localStorage.removeItem('token');
    }

    //check if user is loggedin
    isLoggedIn(){
      var user_data = this.getUserPayload();
      if(user_data){
        return user_data.exp > Date.now() / 1000;
      }else{
        return false;
      }
    }


}
