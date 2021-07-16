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
import { MatSnackService } from '../services/mat-snack.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar:MatSnackService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

     // retry(1),

      catchError((error: HttpErrorResponse) => {

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {

          // client-side error

          errorMessage = `Error: ${error.error.message}`;
          
          this.snackBar.showErrorSnack(errorMessage);


        } else {

          // server-side error

          //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          errorMessage = `${error.error['message']}`;

        }

        this.snackBar.showErrorSnack("Techinical Issue. Please try again later");

        return throwError(errorMessage);

      })

    );
  }
}
