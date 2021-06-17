import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute) { }
  key:string;
  message:string;
  ngOnInit(): void {
    this.activeRoute.params.subscribe(param=>{
      this.key=param['key'];
      console.log(this.key);
    });
    if(this.key=="success")
      this.message="Your account is active now. Please login to complete your profile."
    else{
      this.message="Something went wrong while activating your account. Please contact customer care to activate account"
    }
  }

}
