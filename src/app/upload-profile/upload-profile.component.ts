import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {


  profileUploadForm:FormGroup;
  file:any
  imageUrl:any;
  @ViewChild('fileInput') el: ElementRef;
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean = false;
  constructor( public fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.profileUploadForm=this.fb.group({
      file:['']
    })
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.profileUploadForm.patchValue({
          file: reader.result
        });
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
    if(!this.profileUploadForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.profileUploadForm.value)
    }
  }
}
