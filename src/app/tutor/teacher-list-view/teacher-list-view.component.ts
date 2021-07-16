import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorListView } from 'src/model/tutor-list-view';

@Component({
  selector: 'app-teacher-list-view',
  templateUrl: './teacher-list-view.component.html',
  styleUrls: ['./teacher-list-view.component.css']
})
export class TeacherListViewComponent implements OnInit {
  @Input('tutor') tutor:TutorListView;
  receivedImage:any;
  aWishList:boolean;
  rWishList:boolean;
  showSubjects:boolean;
  showAboutMe:boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.aWishList=true;
    this.showSubjects=true;
    this.showAboutMe=false;

    this.receivedImage='data:image/jpeg;base64,' + this.tutor.profilePicByte;
  }

  showSubSection()
  {
    this.showSubjects=true;
    this.showAboutMe=false;
  }
  showAbtSection(){
    this.showSubjects=false;
    this.showAboutMe=true;
  }
  toggleWishList()
  {
    
    this.aWishList=!this.aWishList;
    this.rWishList=!this.aWishList;

  }
  toTutorDetails(){
    let route=`/tutor/${this.tutor.tutorPersonalInfoId}/details`
    const url=this.router.serializeUrl(
      this.router.createUrlTree([route]));
      
    window.open(url, '_blank');
  }
}
