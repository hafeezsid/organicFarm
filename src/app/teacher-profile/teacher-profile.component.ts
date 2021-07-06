import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Education } from 'src/model/education';
import { Subjects } from 'src/model/subjects';
import { subjectsList } from 'src/model/subjectsList';
import { User } from 'src/model/User';
import { EducationDialogComponent } from '../appDialogs/education-dialog/education-dialog.component';
import { AuthenticationService } from '../authentication.service';

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
  attachedFile:File;
  constructor(private fb:FormBuilder,private authService:AuthenticationService
    ,public dialog: MatDialog) {
    this.user=authService.currentUserValue;
    this.subList=subjectsList;
    this.education={
      tutorEducationId:0,
      fromYear:0,
      toYear:0,
      institutionName:"",
      major:"",
      degree:"",
      additionInfo:"",
      uploadStatus:false,
      documentType:"",
      attachedDoc:[]
    }
   }

  ngOnInit(): void {
    
    this.teacherProfForm=this.fb.group({
      defSubjectName:['',[Validators.required]],
      defLevel:['',[Validators.required]],
      subjects:this.fb.array([]),
      educations:this.fb.array([])
    });
  }


  newSubject(): FormGroup {
    return this.fb.group({
      subjectName: [''],
      level: [''],
    })
  }

   
  subjects(){
    return this.teacherProfForm.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjects().push(this.newSubject());
  }
   
  removeSubject(i:number) {
    this.subjects().removeAt(i);
  }

 

  newEducation(education:Education):FormGroup {
    return this.fb.group({
      educationFromYear: [education.fromYear],
      educationToYear: [education.toYear],
      educationInstitute: [education.institutionName],
      educationDegree: [education.degree],
      educationMajor: [education.major],
      educationDesc: [education.additionInfo],
      educationUploadStatus: [education.uploadStatus],
      educationDocType: [education.documentType],
      educationId: [education.tutorEducationId],
    })
  }

  addEducation(education:Education) {
    this.educations.push(this.newEducation(education));
  }
   
  removeLanguage(i:number) {
    this.educations.removeAt(i);
  }

  get educations(){
    return this.teacherProfForm.get('educations') as FormArray;
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
          additionInfo:result.data.additionInfo,
          uploadStatus:result.data.uploadStatus,
          documentType:"Education",
          attachedDoc:[],
          
      };
      this.addEducation(edu);
    }
    
    });
  }

submitPersonalInfo()
{

}
}
