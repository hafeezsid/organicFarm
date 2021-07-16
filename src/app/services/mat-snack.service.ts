import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatSnackService {

  constructor(private matSnack:MatSnackBar) { }

  showSuccesSnack(message)
  {
 this.matSnack.open(message,"Close",
          {duration: 5000,horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-success','text-light']})
  }

  showErrorSnack(message)
  {
    this.matSnack.open(message, "Close",{horizontalPosition:'center',verticalPosition:'top',
    duration: 5000,panelClass:['bg-danger','text-light']});
  }
}
