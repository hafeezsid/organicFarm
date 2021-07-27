import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatSnackService } from 'src/app/services/mat-snack.service';
import { TutorService } from 'src/app/services/tutor.service';
import { TimeSlot } from 'src/model/time-slot';

@Component({
  selector: 'app-time-slot-dialog',
  templateUrl: './time-slot-dialog.component.html',
  styleUrls: ['./time-slot-dialog.component.css']
})
export class TimeSlotDialogComponent implements OnInit {
  weeklyScheduleForm:FormGroup;
  timeSlot:TimeSlot=new TimeSlot();
  dayName:string;
  constructor(public dialogRef: MatDialogRef<TimeSlotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,
    private tutorService:TutorService, private snackService:MatSnackService,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.weeklyScheduleForm=this.fb.group({
      slots:this.fb.array([]),
    });
    this.dayName=this.data.dayName;
  }

  onNoClick(){
    this.dialogRef.close();
  }
  get slots()
  {
    return this.weeklyScheduleForm.get('slots') as FormArray;
  }
 
  newSlot(slot:TimeSlot): FormGroup {
    return this.fb.group({
      slotStartTime: [slot.startTime],
      slotEndTime: [slot.endTime],
      slotAMPM: [slot.amorpm],
    })
  
  }

  addSlot(slot:TimeSlot) {
    this.slots.push(this.newSlot(slot));
  }
   
  removeSlot(i:number) {
    this.slots.removeAt(i);
  }
}
