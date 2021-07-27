import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VirtualTimeScheduler } from 'rxjs';
import { TimeSlotDialogComponent } from 'src/app/appDialogs/time-slot-dialog/time-slot-dialog.component';
import { TimeSlot } from 'src/model/time-slot';

@Component({
  selector: 'app-tutor-dashboard-main',
  templateUrl: './tutor-dashboard-main.component.html',
  styleUrls: ['./tutor-dashboard-main.component.css']
})
export class TutorDashboardMainComponent implements OnInit {


  timeSlots:TimeSlot[];
  constructor(private fb:FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {
  
  }
  openTimeSlotDialog(name)
  {
    const dialogRef = this.dialog.open(TimeSlotDialogComponent, {
      width:'500px',
      panelClass: 'timeSlotDialog',
      data: {
        timeSlots: this.timeSlots,
        dayName:name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      if(result!= undefined && result !=null){
        console.log(result.data);
    }
    
    });
  }
  

}
