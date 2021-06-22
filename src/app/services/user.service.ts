import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private authService:AuthenticationService) { }

  uploadImage(file:File)
  {
    const formData= new FormData();
    let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      throwError("User Session has Expired. Please login to continue");
    }else{
      console.log(user);
      formData.set("id",user.username);
      formData.set("image",file);
      return this.http.post<any>(`${environment.apiUrl}/user/uploadImage`,formData);
    }
    
  }
}
