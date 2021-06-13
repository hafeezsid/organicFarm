import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/model/AuthResponse';
import { LocalstorageService } from './localstorage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private storageService:LocalstorageService
    , private tokenService: TokenService ) { }
  token:{ [key: string]: string };
  authenticate(username,password)
  {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/authenticate`,{username,password});
   
  }

  isUserLoggedIn()
  {
    if(this.storageService.get("token-id") && !this.tokenService.isTokenExpired())
    {
      console.log("User is logged In");
      return true;
    }
    console.log("User is not logged In");
    return false;
  }

 
}
