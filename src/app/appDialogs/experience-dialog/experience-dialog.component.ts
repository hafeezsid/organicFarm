import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/model/Experience';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatSnackService } from 'src/app/services/mat-snack.service';
import { TutorService } from 'src/app/services/tutor.service';
import { User } from 'src/model/User';

@Component({
  selector: 'app-experience-dialog',
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.css']
})
export class ExperienceDialogComponent implements OnInit {
  experienceFormGroup:FormGroup;
  experience:Experience;
  file:File;
  yearList:number[]=[];
  user:User;
  attachedFile:File;
  submitted=false;

  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experience,
    private tutorService:TutorService, private snackService:MatSnackService,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.experienceFormGroup=this.fb.group({
      fromYear:[this.data.fromYear,[Validators.required]],
      toYear:[this.data.toYear,[Validators.required]],
      company:[this.data.company,[Validators.required]],
      designation:[this.data.designation,[Validators.required]],
      country:[this.data.country,[Validators.required]],
      state:[this.data.state,[Validators.required]],
      city:[this.data.city,[Validators.required]],
      desc:[this.data.additionalInfo],
    });
    this.user=this.authService.currentUserValue;
    console.log(JSON.stringify(this.experience));
  }

  get f()
  {
    return this.experienceFormGroup.controls;
  }

  onNoClick(){
    this.dialogRef.close();
  }
  submitExperience()
  {
    this.submitted=true;
    if(this.experienceFormGroup.invalid)
    {
      this.submitted=false;
      return ;
    }
      this.experience={
        tutorExperienceId:0,
        fromYear:this.f.fromYear.value,
        toYear:this.f.toYear.value,
        company:this.f.company.value,
        designation:this.f.designation.value,
        country:this.f.country.value,
        state:this.f.state.value,
        city:this.f.city.value,
        additionalInfo:this.f.desc.value,
        uploadStatus:false,
        documentType:""
      }
      
    this.tutorService.saveExperienceDetails(this.experience).subscribe(
      res=>{
        console.log("Data saved Successfully");
        this.experience.uploadStatus=true;
        console.log(this.experience);
        this.dialogRef.close({data:this.experience});
      },
      error=>{
        this.snackService.showErrorSnack("There was error in saving experience details. Please try after sometime.");
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

