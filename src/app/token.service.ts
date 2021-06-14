import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodedToken:{ [key: string]: string };
  helper:any;
  rowToken:string;
  roles:any[];
  constructor(private lsService:LocalstorageService) {
    this.helper = new JwtHelperService();
    this.rowToken=this.lsService.get("token-id");
    this.roles=[];
   }
   setRawToken(token){
    this.rowToken=token;
   }
  getDecodedToken()
  {
    this.decodedToken=this.helper.decodeToken(this.rowToken);
     return  this.decodedToken;
  }
  getUserFromToken(){
    this.getDecodedToken()
    return this.decodedToken?this.decodedToken.sub:null;
  }
  getUserClaims(){
    if(this.getDecodedToken())
      return this.decodedToken.authorities;
     else{
       null;
     }
  }
  getUserClaimsMap(){
    if(this.getUserClaims()){
      this.roles=[];
    for(let claim of this.getUserClaims()){
      this.roles.push(claim['authority']);
    }
  }
    return this.roles
  }
  getExpirationTime()
  {
   
    return this.helper.getTokenExpirationDate(this.rowToken);
     
  }
  isTokenExpired():boolean{
    
    const expTime:any=this.getExpirationTime();
    console.log(`token expire time :: ${expTime}`);
    let flag= this.helper.isTokenExpired(this.rowToken);
    //(Math.floor((new Date).getTime()/1000))>=expTime;
    console.log(`token expired flag :: ${flag}`);
    return flag;
  }

  isRoleExists(role){
    for(let claims of this.getUserClaims()){
      console.log(`claims ${claims['authority']}`);
      if(claims['authority']===role){
        return true;
      }
    }
    return false;
  }
}
