import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLanguage } from 'src/model/UserLanguage';
import { TutorPersonalInfo } from 'src/model/tutorPersonalInfo';
import { User } from 'src/model/User';
import { AuthenticationService } from '../authentication.service';
import { MatSnackService } from '../services/mat-snack.service';
import { TutorService } from '../services/tutor.service';
import { Router } from '@angular/router';

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
  personalInfo:TutorPersonalInfo;
  languageList:UserLanguage[];
  profilePicByte:BinaryType[];
  userLanguage=new UserLanguage();
  constructor(private fb:FormBuilder,private authService:AuthenticationService,
    private snackService:MatSnackService, private tutorService:TutorService,
    private router:Router) {
    
    this.generateYear();
    this.generateMonth();
    this.generateDay();


    this.user=authService.currentUserValue;
    this.personalInfo=new TutorPersonalInfo();
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
      birthYear:['',[Validators.required]],
      birthMonth:['',[Validators.required]],
      birthDay:['',[Validators.required]],
      gender:['',[Validators.required]],
      currentAddress:['',[Validators.maxLength(200),Validators.required]],
      permAddress:['',[Validators.maxLength(200),Validators.required]],
      //defLangaugeName:['',[Validators.required]],
      //defLevel:['',[Validators.required]],
      languages:this.fb.array([]),
      profilePic:["false",Validators.required],
    });
    
    this.languageList=[];
    this.tutorService.fetchPersonalInfo().subscribe(
      res=>{
        console.log(res);
        this.personalInfo=res;
        console.log(res.profilePicByte);
        this.profileForm.patchValue(this.personalInfo);
        this.languageList=this.personalInfo?.languageList;
        this.languageList?.forEach(e=>{
         
          this.addLanguage(e);
          
        });
        if(this.personalInfo?.profilePicByte!=null)
        {
          this.profilePicByte=this.personalInfo?.profilePicByte;
          this.profileForm.patchValue({profilePic:'true'});
        }
        
      },
      error=>
      {
        console.log("Error fetching details");
      }
      
      
    );
      
    
   }

  ngOnInit(): void {
    
   
  }

  newLanguage(language:UserLanguage): FormGroup {
    return this.fb.group({
      languageId: [language.userLanguageId],
      languageName: [language.languageCode],
      level: [language.levelCode],
    })
  
  }

  addLanguage(language:UserLanguage) {
    this.languages.push(this.newLanguage(language));
  }
   
  removeLanguage(i:number) {
    this.languages.removeAt(i);
  }

  get preferredChat(){
    return this.profileForm.get('preferredChat');
  }

  get languages()
  {
    return this.profileForm.get('languages') as FormArray;
  }

  getControlValue(name){
    return this.profileForm.get(name);
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
  if(this.profileForm.invalid)
  {
    this.snackService.showErrorSnack("Please fill all the mandatory details.");
    return;
  }
  if(this.getControlValue('profilePic').value == "false"){
      this.snackService.showErrorSnack("Please upload profile picture");
      return;
  }
  if(this.languages.length==0){
    this.snackService.showErrorSnack("Please add at least one langauge");
    return;
}

this.personalInfo.displayName=this.getControlValue('displayName').value;
this.personalInfo.gender=this.getControlValue('gender').value;
this.personalInfo.fromCountry=this.getControlValue('fromCountry').value;
this.personalInfo.fromState=this.getControlValue('fromState').value;
this.personalInfo.fromCity=this.getControlValue('fromCity').value;
this.personalInfo.livingInCountry=this.getControlValue('livingInCountry').value;
this.personalInfo.livingInState=this.getControlValue('livingInState').value;
this.personalInfo.livingInCity=this.getControlValue('livingInCity').value;
this.personalInfo.permAddress=this.getControlValue('permAddress').value;
this.personalInfo.currentAddress=this.getControlValue('currentAddress').value;
this.personalInfo.birthYear=this.getControlValue('birthYear').value;
this.personalInfo.birthMonth=this.getControlValue('birthMonth').value;
this.personalInfo.birthDay=this.getControlValue('birthDay').value;
this.personalInfo.skypeId=this.getControlValue('skypeId').value;
this.personalInfo.preferredChat=this.getControlValue('preferredChat').value;
this.personalInfo.zoomMeetingId=this.getControlValue('zoomMeetingId').value;
this.personalInfo.zoomMeetingLink=this.getControlValue('zoomMeetingLink').value;
this.personalInfo.zoomPassCode=this.getControlValue('zoomPassCode').value;
this.languageList=[];
this.personalInfo.languageList=this.readAdditionalLanguage();
this.personalInfo.languageList=this.languageList;
console.log(this.personalInfo);
this.tutorService.saveTutorPersonalInfo(this.personalInfo).subscribe(
res=>{
  this.router.navigate(['/register/step2']);
},
error=>{
  this.snackService.showErrorSnack("Error occured while saving personal information. Please try after sometime.")
}
);
}

readAdditionalLanguage()
{
    let frmGroup=this.languages.controls.map(fg=>fg.value);
    console.log(frmGroup);
    for(let fg of frmGroup){
        let flag=false;
        let ul:UserLanguage;
        if(this.personalInfo?.languageList){
        for(let l of this.personalInfo?.languageList){
          if(fg.languageId==l.userLanguageId)
            {
               flag=true;
               ul=l;
               break;
            }
        }
      }
        if(flag){
          ul.languageCode=fg.languageName;
          ul.levelCode=fg.level; 
        }
        else{
          ul=new UserLanguage();
          ul.languageCode=fg.languageName;
          ul.levelCode=fg.level;
          ul.isDefault=false;
        }
        this.languageList.push(ul);
      }
    return this.languageList;
}


updateForm(value)
{
  console.log("Image saved into db and form is set with value")
  this.getControlValue('profilePic').setValue(value);
}

validateSize(arr: FormArray) {
  return arr.length > 3 ? {
    invalidSize: true
  } : null;
}
}
