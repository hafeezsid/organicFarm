import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/model/Experience';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatSnackService } from 'src/app/services/mat-snack.service';
import { TutorService } from 'src/app/services/tutor.service';
import { User } from 'src/model/User';
import { Certificate } from 'src/model/certificate';

@Component({
  selector: 'app-certificates-dialog',
  templateUrl: './certificates-dialog.component.html',
  styleUrls: ['./certificates-dialog.component.css']
})
export class CertificatesDialogComponent implements OnInit {

  certificateFormGroup:FormGroup;
  certificate:Certificate;
  file:File;
  yearList:number[]=[];
  user:User;
  attachedFile:File;
  submitted=false;

  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<CertificatesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Certificate,
    private tutorService:TutorService, private snackService:MatSnackService,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.certificateFormGroup=this.fb.group({
      acquiredYear:[this.data.acquiredYear,[Validators.required]],
      certificateName:[this.data.certificateName,[Validators.required]],
      provider:[this.data.provider,[Validators.required]],
      link:[this.data.certificateLink],
    });
    this.user=this.authService.currentUserValue;
    console.log(JSON.stringify(this.certificate));
  }

  get f()
  {
    return this.certificateFormGroup.controls;
  }

  onNoClick(){
    this.dialogRef.close();
  }
  submitCertificate()
  {
    this.submitted=true;
    if(this.certificateFormGroup.invalid)
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
      this.certificate={
        tutorCertificateId:0,
        acquiredYear:this.f.acquiredYear.value,
        certificateName:this.f.certificateName.value,
        provider:this.f.provider.value,
        certificateLink:this.f.link.value,
        uploadStatus:false,
        attachedDoc:[],
        documentType:""
      }
      
    this.tutorService.saveCertificateDetails(this.certificate,this.attachedFile).subscribe(
      res=>{
        console.log("Data saved Successfully");
        this.certificate.uploadStatus=true;
        console.log(this.certificate);
        this.dialogRef.close({data:this.certificate});
      },
      error=>{
        this.snackService.showErrorSnack("There was error in saving certificate details. Please try after sometime.");
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
