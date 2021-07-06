import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from 'src/model/education';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';
import { MatSnackService } from './mat-snack.service';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  user:User;
  constructor(private http:HttpClient,private authService:AuthenticationService,
    private snackService:MatSnackService) {
    this.user=this.authService.currentUserValue;
   }

   saveEducationDetails(data:Education,file)
   {
     let form=new FormData();
      form.append("education",JSON.stringify(data));
      console.log(data);
      console.log(JSON.stringify(data));
      let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      this.snackService.showErrorSnack("User Session has Expired. Please login to continue");
      return new Observable<any>();
     
    }else{
      form.append("username",user.username);
      form.append("attachedFile",file)
    console.log("inside save education service");
     console.log(data);
     return this.http.post<Education>(`${environment.apiUrl}/tutor/education`,form);
    }
   }
}
