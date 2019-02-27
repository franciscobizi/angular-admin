import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {Router} from "@angular/router";
import { UserService } from "../shared/user.service";

@Injectable()
export class AuthIntercepts implements HttpInterceptor{
    constructor(private userService : UserService, private router : Router){}
    intercept(req:HttpRequest<any>, next:HttpHandler){
        if(req.headers.get('noauth')){
            return next.handle(req.clone());
        }else{
            const cloned = req.clone({
                headers: req.headers.set("Authorization","Beerer " + this.userService.getUserToken())
            });
            return next.handle(cloned).pipe(
                tap(
                    event => {},
                    err => {
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/');
                        }
                    }
                )
            );
        }
    }
}