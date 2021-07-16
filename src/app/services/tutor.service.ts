import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Certificate } from 'src/model/certificate';
import { Education } from 'src/model/education';
import { Experience } from 'src/model/Experience';
import { SearchTutorList } from 'src/model/search-tutor-list';
import { TutorListView } from 'src/model/tutor-list-view';
import { TutorPersonalInfo } from 'src/model/tutorPersonalInfo';
import { TutorProfileInfo } from 'src/model/tutorProfileInfo';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';
import { MatSnackService } from './mat-snack.service';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

   
observ:any;
user:User;
headers = new HttpHeaders().append('Content-Type', 'application/json');

constructor(private http:HttpClient,private authService:AuthenticationService,
  private snackService:MatSnackService) {
  this.user=this.authService.currentUserValue;
  this.observ=new Observable<any>();
 }
 fetchTutorDetailById(tutorId: number) { 
 return this.http.get<TutorListView>(`${environment.apiUrl}/tutor/fetch/${tutorId}`);
}
  

  fetchTutorDetails(pageNum: number, pageSize: number) {
  
    const params = new HttpParams()
    .set("page",pageNum as unknown as string)
    .set("size",pageSize as unknown as string);
   return this.http.get<SearchTutorList>(`${environment.apiUrl}/tutor/fetch`,{headers:this.headers,params:params})
  }
  

   fetchPersonalInfo() {
    return this.http.get<TutorPersonalInfo>(`${environment.apiUrl}/tutor/basicInfo`);
    }

    fetchTeachingInfo() {
      return this.http.get<TutorProfileInfo>(`${environment.apiUrl}/tutor/teachingInfo`);
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
      return this.observ;
     
    }else{
      form.append("username",user.username);
      form.append("attachedFile",file)
      console.log("inside save experience service");
      console.log(data);
     return this.http.post<Education>(`${environment.apiUrl}/tutor/education`,form);
    }
   }

   saveExperienceDetails(data: Experience) {
    let form=new FormData();
    form.append("experience",JSON.stringify(data));
    console.log(data);
    console.log(JSON.stringify(data));
    let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      this.snackService.showErrorSnack("User Session has Expired. Please login to continue");
      return this.observ;
    
    }else{
      form.append("username",user.username);
      console.log("inside save education service");
      console.log(data);
    return this.http.post<Experience>(`${environment.apiUrl}/tutor/experience`,form);
    }
  }

  saveCertificateDetails(data: Certificate, file: File) {
    let form=new FormData();
      form.append("certificate",JSON.stringify(data));
      console.log(data);
      console.log(JSON.stringify(data));
      let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      this.snackService.showErrorSnack("User Session has Expired. Please login to continue");
      return this.observ;
     
    }else{
      form.append("username",user.username);
      form.append("attachedFile",file)
      console.log("inside save experience service");
      console.log(data);
     return this.http.post<Certificate>(`${environment.apiUrl}/tutor/certificate`,form);
    }
  }

  uploadImage(file:File)
  {
    let formData= new FormData();
    let user=this.authService.currentUserValue;
    if(user ==null || user== undefined)
    {
      this.snackService.showErrorSnack("User Session has Expired. Please login to continue");
      return this.observ;
     
    }else{
      console.log(user);
      formData.set("image",file);
      return  this.http.post<any>(`${environment.apiUrl}/tutor/uploadImage`,formData);
    }
    
  }

  saveTutorPersonalInfo(personalInfo){
    return this.http.post<TutorPersonalInfo>(`${environment.apiUrl}/tutor/savePersonalInfo`,personalInfo);
  }

  saveTutorTeachingInfo(teachingInfo: TutorProfileInfo) {
    return this.http.post<TutorProfileInfo>(`${environment.apiUrl}/tutor/saveTeachingInfo`,teachingInfo);
  }


  deleteEducation(education) {
    return this.http.delete<any>(`${environment.apiUrl}/tutor/education/${education.educationId}`);
  }
  deleteExperience(experience) {
    return this.http.delete<any>(`${environment.apiUrl}/tutor/experience/${experience.experienceId}`);
  }
  deleteCertificate(certificate) {
    return this.http.delete<any>(`${environment.apiUrl}/tutor/certificate/${certificate.certificateId}`);
  }
}
