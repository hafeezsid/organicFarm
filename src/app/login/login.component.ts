import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { LocalstorageService } from '../localstorage.service';
import { MatSnackService } from '../services/mat-snack.service';
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
    private lsSerivice:LocalstorageService,private snackService:MatSnackService) { }

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
        if(res?.user?.isProfileApproved)
          this.route.navigate(['/tutor/dashboard']);
        else
          this.route.navigate(['/register/step1']);
      },
      (error)=>{
        console.log(error)
        this.snackService.showErrorSnack("Incorrect username/email or password");
        this.showSpinner=false;
      }
    )
    ;

  }

}
