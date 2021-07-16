import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { TutorService } from 'src/app/services/tutor.service';
import { TutorListView } from 'src/model/tutor-list-view';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  tutor:TutorListView
  receivedImage:any;
  aWishList:boolean;
  rWishList:boolean;
  showLoading:boolean=false;
  tutorId:number;
  constructor(private router:Router,private tutorService:TutorService,
    private activatedRoute:ActivatedRoute) {

    
    let nav: Navigation = this.router.getCurrentNavigation();

   /* if (nav.extras && nav.extras.state && nav.extras.state.tutor) {
      this.tutor = nav.extras.state.tutor as TutorListView;
      alert(this.tutor.displayName);
    }*/
   }

  ngOnInit(): void {
    this.showLoading=true;
    this.aWishList=true;
   // 
   this.activatedRoute.params.subscribe(param=>{
     this.tutorId=param['tutorId']
   })
    this.tutorService.fetchTutorDetailById(this.tutorId).subscribe(
      res=>{
          this.tutor=res;
          this.receivedImage='data:image/jpeg;base64,' + this.tutor.profilePicByte;
          console.log(this.tutor);
          this.showLoading=false;
      },
      err=>{
        this.showLoading=false;
      }
    );
   
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  
  toggleWishList()
  {
    
    this.aWishList=!this.aWishList;
    this.rWishList=!this.aWishList;

  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }




}
