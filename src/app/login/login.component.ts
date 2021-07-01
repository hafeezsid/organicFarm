import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  showSpinner:boolean;
  loginStatus$= new BehaviorSubject<boolean>(null);

  constructor(private authService:AuthenticationService, 
    private route:Router,private tokenService:TokenService,
    private lsSerivice:LocalstorageService) { }

  ngOnInit(): void {
  }

  login(form){
    this.showSpinner=true;
    console.log(this.username);
    console.log(this.password);
    this.authService.authenticate(this.username,this.password).subscribe(
      res=>{
        console.log(res);
        this.showSpinner=false;
        this.route.navigate(['/createProfile']);
      },
      (error)=>{
        console.log(error)
        this.showSpinner=false;
      }
    )
    ;

  }

}
