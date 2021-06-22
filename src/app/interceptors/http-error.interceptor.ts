import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar:MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      retry(1),

      catchError((error: HttpErrorResponse) => {

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {

          // client-side error

          errorMessage = `Error: ${error.error.message}`;
          
          this.snackBar.open(errorMessage,"Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})


        } else {

          // server-side error

          //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          errorMessage = `${error.error['message']}`;

        }

        this.snackBar.open(errorMessage,"Close",{horizontalPosition:'center',verticalPosition:'top',panelClass:['bg-danger','text-light']})


        return throwError(errorMessage);

      })

    );
  }
}
