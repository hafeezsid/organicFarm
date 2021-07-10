import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Certificate } from 'src/model/certificate';
import { Education } from 'src/model/education';
import { Experience } from 'src/model/Experience';
import { subjectsList } from 'src/model/subjectsList';
import { TutorProfileInfo } from 'src/model/tutorProfileInfo';
import { TutorSubject } from 'src/model/tutorSubjects';
import { User } from 'src/model/User';
import { CertificatesDialogComponent } from '../appDialogs/certificates-dialog/certificates-dialog.component';
import { EducationDialogComponent } from '../appDialogs/education-dialog/education-dialog.component';
import { ExperienceDialogComponent } from '../appDialogs/experience-dialog/experience-dialog.component';
import { AuthenticationService } from '../authentication.service';
import { MatSnackService } from '../services/mat-snack.service';
import { TutorService } from '../services/tutor.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacherProfForm:FormGroup;
  subList:any[];
  user:User;
  education: Education;
  experience:Experience;
  certificate:Certificate;
  teachingInfo:TutorProfileInfo=new TutorProfileInfo();
  attachedFile:File;
  onlyNumberRegex='/^[0-9]*$/';
  tutorSubjectList:TutorSubject[];
  constructor(private fb:FormBuilder,private authService:AuthenticationService
    ,public dialog: MatDialog,private tutorService:TutorService,
    private snackService:MatSnackService, private router:Router) {
    this.user=authService.currentUserValue;
    this.subList=subjectsList;
    this.education={
      tutorEducationId:0,
      fromYear:0,
      toYear:0,
      institutionName:"",
      major:"",
      degree:"",
      additionalInfo:"",
      uploadStatus:false,
      documentType:"",
      attachedDoc:[]
    }
    this.experience={
      tutorExperienceId:0,
      fromYear:0,
      toYear:0,
      company:"",
      designation:"",
      country:"",
      state:"",
      city:"",
      additionalInfo:"",
      uploadStatus:false,
      documentType:""
  };

  this.certificate={
    tutorCertificateId:0,
    acquiredYear:0,
    certificateName:"",
    provider:"",
    certificateLink:"",
    uploadStatus:false,
    documentType:"",
    attachedDoc:[],
};

this.teacherProfForm=this.fb.group({
  defSubjectName:['',[Validators.required]],
  defLevel:['',[Validators.required]],
  hourlyRate:['',[Validators.required]],
  aboutMe:['',[Validators.required]],
  aboutTeachingExp:['',[Validators.required]],
  otherInfo:['',[Validators.required]],
  subjects:this.fb.array([],[Validators.required]),
  educations:this.fb.array([],[Validators.required]),
  experiences:this.fb.array([],[Validators.required]),
  certificates:this.fb.array([])
});

this.tutorService.fetchTeachingInfo().subscribe(
  res=>{
    console.log(res);
    this.teachingInfo=res;
    this.teacherProfForm.patchValue(this.teachingInfo);
  
    this.teachingInfo?.tutorSubjects?.forEach(e=>{
      if(e.isDefault){
        this.teacherProfForm.patchValue({defSubjectName:e.subjectCode,defLevel:e.levelCode});
      }
      else{
      this.addSubject(e.subjectCode,e.levelCode);
      }
    });

     this.teachingInfo?.educations?.forEach(e=>{
      this.addEducation(e);
      });
      this.teachingInfo?.experiences?.forEach(e=>{
        this.addExperience(e);
    });
      this.teachingInfo?.certificates?.forEach(e=>{
      this.addCertificate(e);
    });
  },
  error=>
  {
    console.log("Error fetching details");
  }
  
  
);

  }

  ngOnInit(): void {
    
   
  }

  get subjects(){
    return this.teacherProfForm.get('subjects') as FormArray;
  }

  addSubject(a,b) {
    this.subjects.push(this.newSubject(a,b));
  }
   
  removeSubject(i:number) {
    this.subjects.removeAt(i);
  }

  newSubject(a,b): FormGroup {
    return this.fb.group({
      subjectName: [a],
      level: [b],
    })
  }

 

  
  get educations(){
    return this.teacherProfForm.get('educations') as FormArray;
  }

  addEducation(education:Education) {
    this.educations.push(this.newEducation(education));
  }
   
  removeEducation(i:number) {
    this.tutorService.deleteEducation(this.educations[i])
    this.educations.removeAt(i);
  }

  newEducation(education:Education):FormGroup {
    return this.fb.group({
      educationFromYear: [education.fromYear],
      educationToYear: [education.toYear],
      educationInstitute: [education.institutionName],
      educationDegree: [education.degree],
      educationMajor: [education.major],
      educationDesc: [education.additionalInfo],
      educationUploadStatus: [education.uploadStatus],
      educationDocType: [education.documentType],
      educationId: [education.tutorEducationId],
    })
  }

  openEducationDialog()
  {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '500px',
      height:'auto',
      data: {education: this.education}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let edu:Education ;
      if(result!= undefined && result !=null){
        console.log(result.data);
          edu={
          tutorEducationId:result.data.tutorEducationId,
          fromYear:result.data.fromYear,
          toYear:result.data.toYear,
          institutionName:result.data.institutionName,
          major:result.data.major,
          degree:result.data.degree,
          additionalInfo:result.data.additionalInfo,
          uploadStatus:result.data.uploadStatus,
          documentType:"Education",
          attachedDoc:[],
          
      };
      this.addEducation(edu);
    }
    
    });
  }

  get experiences(){
    return this.teacherProfForm.get('experiences') as FormArray;
  }

  addExperience(experience:Experience) {
    this.experiences.push(this.newExperience(experience));
  }
   
  removeExperince(i:number) {
    this.tutorService.deleteExperience(this.experiences[i])
    this.experiences.removeAt(i);
  }

  newExperience(experience:Experience):FormGroup {
    return this.fb.group({
      experienceFromYear: [experience.fromYear],
      experienceToYear: [experience.toYear],
      experienceCompany: [experience.company],
      experienceDesignation: [experience.designation],
      experienceCountry: [experience.country],
      experienceState: [experience.state],
      experienceCity: [experience.city],
      experienceDesc: [experience.additionalInfo],
      educationUploadStatus: [experience.uploadStatus],
      educationDocType: [experience.documentType],
      experienceId: [experience.tutorExperienceId],
    })
  }

  openExperienceDialog()
  {
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      width: '500px',
      height:'auto',
      data: {experience: this.experience}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let exp:Experience ;
      if(result!= undefined && result !=null){
        console.log(result.data);
          exp={
          tutorExperienceId:result.data.tutorEducationId,
          fromYear:result.data.fromYear,
          toYear:result.data.toYear,
          company:result.data.company,
          country:result.data.country,
          state:result.data.state,
          city:result.data.city,
          designation:result.data.designation,
          additionalInfo:result.data.additionalInfo,
          uploadStatus:result.data.uploadStatus,
          documentType:""
      };
      this.addExperience(exp);
    }
    
    });
  }


  openCertificateDialog()
  {
    const dialogRef = this.dialog.open(CertificatesDialogComponent, {
      width: '500px',
      height:'auto',
      data: {certificate: this.certificate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let cert:Certificate ;
      if(result!= undefined && result !=null){
        console.log(result.data);
          cert={
          tutorCertificateId:result.data.tutorCertificateId,
          acquiredYear:result.data.acquiredYear,
          certificateName:result.data.certificateName,
          provider:result.data.provider,
          certificateLink:result.data.certificateLink,
          uploadStatus:result.data.uploadStatus,
          documentType:"",
          attachedDoc:[],
          
      };
      this.addCertificate(cert);
    }
    
    });
  }
  get certificates(){
    return this.teacherProfForm.get('certificates') as FormArray;
  }

  addCertificate(certificate:Certificate) {
    this.certificates.push(this.newCertificate(certificate));
  }
   
  removeCertificate(i:number) {
    this.tutorService.deleteCertificate(this.certificates[i])
    this.certificates.removeAt(i);
  }

  newCertificate(certificate:Certificate):FormGroup {
    return this.fb.group({
      certificateYear: [certificate.acquiredYear],
      certificateName: [certificate.certificateName],
      certificateProvider: [certificate.provider],
      certificateLink: [certificate.certificateLink],
      certificateUploadStatus: [certificate.uploadStatus],
      certificateDocType: [certificate.documentType],
      certificateId: [certificate.tutorCertificateId],
    })
  }
  submitProfileInfo()
{
  if(this.teacherProfForm.invalid)
  {
    return;
  }
  if(this.educations.length==0)
  {
    this.snackService.showErrorSnack("Please enter atleast one education details")
  }
  if(this.experiences.length==0)
  {
    this.snackService.showErrorSnack("Please enter atleast one experience details. You can enter any school, work or freelancer teaching experience.")
  }
  this.tutorSubjectList=[];
  this.teachingInfo.hourlyRate=this.getControlValue('hourlyRate').value;
  this.teachingInfo.aboutMe=this.getControlValue('aboutMe').value;
  this.teachingInfo.aboutTeachingExp=this.getControlValue('aboutTeachingExp').value;
  this.teachingInfo.otherInfo=this.getControlValue('otherInfo').value;

if(this.findDefaultSubject!=undefined){
  this.findDefaultSubject.levelCode=this.getControlValue('defLevel').value
  this.tutorSubjectList.push(this.findDefaultSubject);
}
else{
  let ts=new TutorSubject();
  ts.subjectCode=this.getControlValue('defSubjectName').value;
  ts.levelCode=this.getControlValue('defLevel').value;
  ts.isDefault=false;
  this.tutorSubjectList.push(ts);
}

this.teachingInfo.tutorSubjects=this.tutorSubjectList;
this.teachingInfo.educations=[];
this.teachingInfo.experiences=[];
this.teachingInfo.certificates=[];
console.log(this.tutorSubjectList);
this.tutorService.saveTutorTeachingInfo(this.teachingInfo).subscribe(
res=>{
  this.router.navigate(['/register/final']);
},
error=>{
  this.snackService.showErrorSnack("Error occured while saving teacher profile information. Please try after sometime.")
}
)
}

get findDefaultSubject()
{
  for (let l of this.teachingInfo.tutorSubjects){
    if(this.getControlValue('defSubjectName').value==l.subjectCode && l.isDefault)
      {
         return l;
      }
  }
}
readAdditionalSubjects()
{
  let frmGroup=this.subjects.controls.map(fg=>fg.value);
  console.log(frmGroup);
  frmGroup.forEach(e=>
    {
      let flag=false;
      let ts:TutorSubject;
      for(let l of this.teachingInfo.tutorSubjects){
        if(e.subjectCode==l.subjectCode)
          {
             flag=true;
             ts=l;
             break;
          }
      }
      if(flag){
        ts.levelCode=e.levelCode;
       
      }
      else{
        ts=new TutorSubject();
        ts.subjectCode=e.subjectCode;
        ts.levelCode=e.levelCode;
        ts.isDefault=false;
      }
      this.tutorSubjectList.push(ts);
    });
  return this.tutorSubjectList;
}
getControlValue(name){
  return this.teacherProfForm.get(name);
}
}
