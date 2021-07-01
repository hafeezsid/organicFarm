import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, pipe, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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

  uploadImage(file:File)
  {
    let formData= new FormData();
    let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      this.snackBar.open("User Session has Expired. Please login to continue","Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})
      return this.observ;
     
    }else{
      console.log(user);
      formData.set("id",user.username);
      formData.set("image",file);
      return  this.http.post<any>(`${environment.apiUrl}/user/uploadImage`,formData);
    }
    
  }
}
