import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalstorageService } from '../localstorage.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService:TokenService,private authService:AuthenticationService,
    private storageService:LocalstorageService,
    private route:Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
  
}
