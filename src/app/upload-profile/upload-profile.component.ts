import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {


  profileUploadForm:FormGroup;
  file:any;
  fileToUpload:File;
  imageUrl:any;
  reader:any; 
  @ViewChild('fileInput') el: ElementRef;
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean = false;

  constructor( public fb: FormBuilder,
    private cd: ChangeDetectorRef,private snackBar:MatSnackBar,
    private userService:UserService) { 
      
    }

  ngOnInit(): void {
    this.profileUploadForm=this.fb.group({
      file:['',[Validators.required]]
    })
  }

  uploadFile(event) {
   // HTML5 FileReader API
   this.reader = new FileReader(); 
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(this.fileToUpload);

      // When file uploads set it to file formcontrol
      this.reader.onload = () => {
        this.imageUrl = this.reader.result;
        this.editFile = false;
        this.removeUpload = true;
    }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }
 // Function to remove uploaded file
 removeUploadedFile() {
  let newFileList = Array.from(this.el.nativeElement.files);
  this.imageUrl = '';
  this.editFile = true;
  this.removeUpload = false;
  this.profileUploadForm.patchValue({
    file: [null]
  });
}

// Submit Registration Form

  savePicture(){
    this.submitted = true;
      console.log(this.fileToUpload);
      this.userService.uploadImage(this.fileToUpload).subscribe(
        (res)=>{
          this.snackBar.open("Your profile picture upload successfully","Close",
          {horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-success','text-light']});
        
        },
        (error)=>{
          this.snackBar.open(error.error['message'],"Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})
        }
      )
  }
}
