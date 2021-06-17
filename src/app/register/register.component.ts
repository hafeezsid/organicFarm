import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user=new User();
  submitted=false;
  constructor(private authService:AuthenticationService,private route:Router,
    private matSnack:MatSnackBar) { }

  ngOnInit(): void {
  }
  register(form){
    this.submitted=true;
    if(form.invalid)
    {
      this.submitted=false;
      return;
    }
    else{
      this.authService.register(this.user).subscribe(
        res=>{
          console.log(res);
          //this.matSnack.open("","Close",
          //{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-success','text-light']});
          this.submitted=false;
          form.reset();
          this.route.navigate(["registrationConfirmation"])
        },
        error=>{
          this.matSnack.open(error.error['message'],"Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})
          console.log(error)
          this.submitted=false;
        }
      )
    }
  }

}
