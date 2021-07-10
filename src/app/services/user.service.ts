import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  observ=new Observable<any>();
  constructor(private http:HttpClient
    ,private snackBar:MatSnackBar,
    private authService:AuthenticationService) { }

  
}
