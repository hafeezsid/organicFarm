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
  constructor(private fb:FormBuilder,private authService:AuthenticationService
    ,public dialog: MatDialog) {
  
    this.user=authService.currentUserValue;
    this.subList=subjectsList;
    this.education={
      from:0,
      to:0,
      institutionName:"",
      major:"",
      degree:"",
      additionInfo:"",
      attachmentDoc:null,
      user:this.user
    }
   }

  ngOnInit(): void {
    
    this.teacherProfForm=this.fb.group({
      defSubjectName:['',[Validators.required]],
      defLevel:['',[Validators.required]],
      subjects:this.fb.array([])
    });
  }

  newSubject(): FormGroup {
    return this.fb.group({
      subjectName: [''],
      level: [''],
    })
  }

  addLanguage() {
    this.subjects().push(this.newSubject());
  }
   
  removeLanguage(i:number) {
    this.subjects().removeAt(i);
  }

  

  subjects(){
    return this.teacherProfForm.get('subjects') as FormArray;
  }


  openEducationDialog()
  {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '500px',
      data: {education: this.education}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.education = result;
    });
  }

submitPersonalInfo()
{

}
}
