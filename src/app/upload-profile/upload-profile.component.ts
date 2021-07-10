import { Byte } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, EventEmitter,  ElementRef, OnInit, Output, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorService } from '../services/tutor.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit,OnChanges {

  @Output() uploadedFileData:EventEmitter<string> =new EventEmitter<string>();
  profileUploadForm:FormGroup;
  file:any;
  fileToUpload:File;
  imageUrl:any;
  reader:any; 
  @ViewChild('fileInput') el: ElementRef;
  @Input() profilePicByte:Byte[];
  receivedImage:any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean = false;

  constructor( public fb: FormBuilder,
    private cd: ChangeDetectorRef,private snackBar:MatSnackBar,
    private tutorService:TutorService) { 
      console.log(this.imageUrl);
    }
  ngOnChanges(changes: SimpleChanges): void {
    this.receivedImage='data:image/jpeg;base64,' + this.profilePicByte;
  }

  ngOnInit(): void {
    this.profileUploadForm=this.fb.group({
      file:['',[Validators.required]]
    })
   

    console.log(this.imageUrl);
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
        this.receivedImage = this.reader.result;
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
      this.tutorService.uploadImage(this.fileToUpload).subscribe(
        (res)=>{
          this.snackBar.open("Your profile picture upload successfully","Close",
          {horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-success','text-light']});
          this.uploadedFileData.emit("true")
        },
        (error)=>{
          this.snackBar.open("Error occurred while uploading image","Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})
        }
      )
  }
}
