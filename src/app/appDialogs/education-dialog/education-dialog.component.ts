import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Education } from 'src/model/education';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.css']
})
export class EducationDialogComponent implements OnInit {

  educationFormGroup:FormGroup;
  education:Education;
  yearList:number[]=[];
  constructor(public dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Education,private fb:FormBuilder) {
      this.education=data;
      this.generateYear();
     }

  ngOnInit(): void {
    this.educationFormGroup=this.fb.group({
      fromYear:['',[Validators.required]],
      toYear:['',[Validators.required]],
      institute:['',[Validators.required]],
      major:['',[Validators.required]],
      degree:['',[Validators.required]],
      decs:['',],
    });
  }
  onNoClick(){

  }
  submitEducation()
  {
    
  }

  uploadFileData(uploadedFile){
    console.log("Function called on file upload");
    console.log(uploadedFile);
  }

  generateYear(){
    let max=new Date().getFullYear();
    var year = new Date().getFullYear();
    this.yearList.push(year);
    for (var i = year-1; i > year-80; i--) {
      this.yearList.push(i);
    } 
  }
}
