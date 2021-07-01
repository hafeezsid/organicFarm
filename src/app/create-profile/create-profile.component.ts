import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  profileForm:FormGroup;
  birthYear:number[]=[];
  birthMonth:number[]=[];
  birthDay:number[]=[];
  user:User;
  constructor(private fb:FormBuilder,private authService:AuthenticationService) {
    
    this.generateYear();
    this.generateMonth();
    this.generateDay();
    this.user=authService.currentUserValue;
   }

  ngOnInit(): void {
    
    this.profileForm=this.fb.group({
      displayName:['',[Validators.maxLength(50),Validators.required]],
      preferredChat:['',[Validators.required]],
      skypeId:[''],
      zoomMeetingLink:[''],
      zoomMeetingId:[''],
      zoomPassCode:[''],
      fromCountry:['',[Validators.required]],
      fromState:['',[Validators.required]],
      fromCity:['',[Validators.required]],
      livingInCountry:['',[Validators.required]],
      livingInState:['',[Validators.required]],
      livingInCity:['',[Validators.required]],
      firstName:[this.user.firstName,[Validators.required]],
      lastName:[this.user.lastName],
      birthYear:['',[Validators.required]],
      birthMonth:['',[Validators.required]],
      birthDay:['',[Validators.required]],
      gender:['',[Validators.required]],
      currentAddress:['',[Validators.maxLength(200),Validators.required]],
      permAddress:['',[Validators.maxLength(200),Validators.required]],
      defLangaugeName:['',[Validators.required]],
      defLevel:['',[Validators.required]],
      languages:this.fb.array([]),
      profilePic:[''],
    });
  }

  newLanguage(): FormGroup {
    return this.fb.group({
      langaugeName: [''],
      level: [''],
    })
  }

  addLanguage() {
    this.languages().push(this.newLanguage());
  }
   
  removeLanguage(i:number) {
    this.languages().removeAt(i);
  }

  get preferredChat(){
    return this.profileForm.get('preferredChat');
  }

  languages(){
    return this.profileForm.get('languages') as FormArray;
  }
  generateYear(){
    let max=new Date().getFullYear();
    var year = new Date().getFullYear();
    this.birthYear.push(year);
    for (var i = year-1; i > year-80; i--) {
      this.birthYear.push(i);
    } 
  }
  generateMonth(){    
    for (var i = 1; i <=12; i++) {
      this.birthMonth.push(i);
    }   
  }
  generateDay(){
   
    for (var i = 1; i <=31; i++) {
      this.birthDay.push(i);
    } 

}
generateDayOnMonthChange(){
  let selectedYear=this.profileForm.get('birthYear').value;
  let selectedMonth=this.profileForm.get('birthMonth').value;
  console.log(selectedMonth);
  var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  this.birthDay=[];
  for (var i = 1; i <=daysInMonth; i++) {
    this.birthDay.push(i);
  }
}

submitPersonalInfo()
{

}
}
