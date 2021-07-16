import { ChangeDetectorRef, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { MatSnackService } from '../services/mat-snack.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() uploadedFileData:EventEmitter<File> =new EventEmitter<File>();
  file:any;
  fileToUpload:File;
  fileUrl:any;
  reader:any; 
  editFile: boolean = true;
  removeUpload: boolean = false;
  submitted: boolean = false;
  constructor(private cd: ChangeDetectorRef,
    private snackService:MatSnackService) { }

  ngOnInit(): void {
  }
  uploadFile(event) {
    // HTML5 FileReader API
    this.reader = new FileReader(); 
     this.fileToUpload = event.target.files[0];
     console.log(this.fileToUpload);
     if(this.fileToUpload.type!='image/jpeg' && this.fileToUpload.type!='application/pdf'){
       this.snackService.showErrorSnack("Incorrect file formats. Excepted file formats are .pdf and jpg");
      return;
      }
      if(this.fileToUpload.size > 2000000)
      {
        this.snackService.showErrorSnack("Please upload file less than 2 MB.");
        return;
      }
     if (event.target.files && event.target.files[0]) {
       this.reader.readAsDataURL(this.fileToUpload);
       this.uploadedFileData.emit(this.fileToUpload);
       // When file uploads set it to file formcontrol
       this.reader.onload = () => {
         this.fileUrl = this.fileToUpload.name;
         this.editFile = false;
         this.removeUpload = true;
         
     }
       // ChangeDetectorRef since file is loading outside the zone
       this.cd.markForCheck();        
     }
   }
}
