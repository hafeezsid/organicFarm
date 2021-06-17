import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  linkName:string;
  @ViewChild('navBar') navbar: ElementRef;
  linkUrl:string;
  urlList:any[]=[{name:"Home",url:"home"}];
  loginStatus$: Observable<boolean>;
  user$:Observable<User>;
  role:string;
  constructor(private tokenService:TokenService,private authService:AuthenticationService) {
    this.loginStatus$=this.authService.getLoginStatus().asObservable();
    this.loginStatus$.subscribe(state=>{
      console.log(state);    
    })
   }

  ngOnInit(): void {
   
    this.user$=this.authService.currentUserFromSession;
    this.user$.subscribe(
     data=>{
       if(data!=null && data!=undefined){
          console.log(data.role);
          if(data.role.indexOf("ROLE_ADMIN")!=-1)
          {
            this.role="admin";
          }
          else if(data.role.indexOf("ROLE_USER")){
            this.role="user"
          }
          else{
            this.role="noRole";
          }
        }
        else{
          this.role="noRole";
        }
     }
   )
  }

  /*@HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log("Scroll Event");
    var sticky=this.navbar.nativeElement.offsetTop;
    if (window.pageYOffset >= sticky) {
      this.navbar.nativeElement.classList.add("sticky")
    } else {
      this.navbar.nativeElement.classList.remove("sticky");
    }
  }*/

}
