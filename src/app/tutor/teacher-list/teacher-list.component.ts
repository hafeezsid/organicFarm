import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { TutorListView } from 'src/model/tutor-list-view';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  cols:number;
  tutors:TutorListView[];
  pageNum:number;
  pageSize:number;
  constructor(public breakpointObserver: BreakpointObserver,
    private tutorService:TutorService) { 
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
           this.cols=1;
      }
      if (state.breakpoints[Breakpoints.Small]) {
           console.log( 'Matches Small viewport');
           this.cols=1;
      }
      if (state.breakpoints[Breakpoints.Medium]) {
           console.log( 'Matches Medium  viewport');
           this.cols=1;
      }
      if (state.breakpoints[Breakpoints.Large]) {

          console.log( 'Matches Large viewport');
          this.cols=2;
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.cols=2;
         console.log( 'Matches XLarge viewport');   
      }
    });

  
  }

  ngOnInit(): void {
    this.tutorService.fetchTutorDetails(0,20).subscribe(
      res=>{
          this.tutors=res.tutorList;
      }
    );
  }

}
