import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatSnackService } from 'src/app/services/mat-snack.service';
import { TutorService } from 'src/app/services/tutor.service';
import { Education } from 'src/model/education';
import { User } from 'src/model/User';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.css']
})
export class EducationDialogComponent implements OnInit {

  educationFormGroup:FormGroup;
  education:Education;
  file:File;
  yearList:number[]=[];
  user:User;
  attachedFile:File;
  submitted=false;
  constructor(public dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Education,private fb:FormBuilder,
    private tutorService:TutorService, private snackService:MatSnackService,
    private authService:AuthenticationService) {
      //this.education=data.education;
      console.log(JSON.stringify(this.education));
      
     }

  ngOnInit(): void {
    this.educationFormGroup=this.fb.group({
      fromYear:[this.data.fromYear,[Validators.required]],
      toYear:[this.data.toYear,[Validators.required]],
      institute:[this.data.institutionName,[Validators.required]],
      major:[this.data.major,[Validators.required]],
      degree:[this.data.degree,[Validators.required]],
      desc:[this.data.additionalInfo,],
    });
    this.user=this.authService.currentUserValue;
    console.log(JSON.stringify(this.education));
  }

  get f()
  {
    return this.educationFormGroup.controls;
  }

  onNoClick(){
    this.dialogRef.close();
  }
  submitEducation()
  {
    this.submitted=true;
    if(this.educationFormGroup.invalid)
    {
      this.submitted=false;
      return ;
    }
    if(this.attachedFile==null || this.attachedFile==undefined)
    {
      this.snackService.showErrorSnack("Please upload related document.");
      this.submitted=false;
      return;
    }
      this.education={
        tutorEducationId:0,
        fromYear:this.f.fromYear.value,
        toYear:this.f.toYear.value,
        institutionName:this.f.institute.value,
        major:this.f.major.value,
        degree:this.f.degree.value,
        additionalInfo:this.f.desc.value,
        uploadStatus:false,
        attachedDoc:[],
        documentType:""
      }
      
    this.tutorService.saveEducationDetails(this.education,this.attachedFile).subscribe(
      res=>{
        console.log(res);
        this.education.uploadStatus=true;
        this.education.tutorEducationId=res.tutorEducationId;
        console.log(this.education);
        this.dialogRef.close({data:this.education});
      },
      error=>{
        this.snackService.showErrorSnack("There was error in saving education details. Please try after sometime.");
      }
      
    )
    this.submitted=false;

  }

  uploadFileData(uploadedFile){
    console.log("Function called on file upload");
    console.log(uploadedFile);
    this.attachedFile=uploadedFile;

  }

  
}
