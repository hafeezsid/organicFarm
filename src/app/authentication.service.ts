import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/model/AuthResponse';
import { User } from 'src/model/User';
import { LocalstorageService } from './localstorage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token:{ [key: string]: string };
  loginStatus$: BehaviorSubject<boolean>;
  userSubject$: BehaviorSubject<User>;
  currentUser: Observable<User>;
  user=new User();
 
  constructor(private http:HttpClient,private storageService:LocalstorageService
    , private tokenService: TokenService ) { 
      if(this.isUserLoggedIn()){
        this.userSubject$=new BehaviorSubject<User>(this.userInfoFromToken());
        this.currentUser=this.userSubject$.asObservable();
        this.loginStatus$=new BehaviorSubject<boolean>(true);
       }
       else{
        this.userSubject$=new BehaviorSubject<User>(null);
        this.loginStatus$=new BehaviorSubject<boolean>(false);
       }
      }
 
  setLoginStatus(value)
  {
    this.loginStatus$.next(value);
  
  }
  getLoginStatus()
  {
    return this.loginStatus$;
  }
  authenticate(username,password)
  {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/authenticate`,{username,password})
    .pipe(
      map(res=>{
        this.storageService.removeItem("token-id");
        this.storageService.set("token-id",res.token);
        this.tokenService.setRawToken(res.token);
        this.loginStatus$.next(true);
        this.userSubject$.next(this.userInfoFromToken());
        return res;
      })
    );
   
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

  public userInfoFromToken():User{
    this.user.username=this.tokenService.getUserFromToken();
    this.user.role=this.tokenService.getUserClaimsMap();
    return this.user;
  }
  
  public get currentUserFromSession(){
    return this.userSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject$.value;
}

logout()
{
  this.storageService.removeItem("token-id");
  this.loginStatus$.next(false);
  this.userSubject$.next(null);
}
 
}
