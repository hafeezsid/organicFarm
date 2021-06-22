import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  handleError(error: Error) {

    this.zone.run(() =>

     
    this.snackBar.open( error.message ,"Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})

    );

    console.error("Error from global error handler", error);
  }
}