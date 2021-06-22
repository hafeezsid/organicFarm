import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private storageService:LocalstorageService
    ,private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=localStorage.getItem("token-id")
    console.log(token);
    if(this.authenticationService.isUserLoggedIn())
    {
     request= request.clone({
        setHeaders: {
          Authorization:`Bearer ${token}`}
      });
    }
    return next.handle(request);
  }
}
