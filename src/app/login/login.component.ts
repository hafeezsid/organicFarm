import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalstorageService } from '../localstorage.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  constructor(private authService:AuthenticationService, 
    private route:Router,private tokenService:TokenService,
    private lsSerivice:LocalstorageService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.username);
    console.log(this.password);
    this.authService.authenticate(this.username,this.password).subscribe(
      res=>{
        this.lsSerivice.removeItem("token-id");
        this.lsSerivice.set("token-id",res.token);
        this.tokenService.setRawToken(res.token);
        console.log(res);
        for(let claims of this.tokenService.getUserClaims()){
          console.log(`claims ${claims['authority']}`);
        }
        
        this.route.navigate(['/admin']);
      },
      (error)=>{
        console.log(error)
      }
    )
    ;

  }

}
