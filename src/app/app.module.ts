import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { FilterComponent } from './filter/filter.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {LayoutModule} from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from './system_admin/admin-main/admin-main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationConfirmationComponent } from './registration-confirmation/registration-confirmation.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { UploadProfileComponent } from './upload-profile/upload-profile.component';
import { JwtInterceptor } from './jwt.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './AppHandlers/GlobalErrorHandler';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EducationDialogComponent } from './appDialogs/education-dialog/education-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    FilterComponent,
    ProductListingComponent,
    LoginComponent,
    RegisterComponent,
    AdminMainComponent,
    TopHeaderComponent,
    LogoutComponent,
    FooterComponent,
    RegistrationConfirmationComponent,
    AccountConfirmationComponent,
    ProfileComponent,
    CreateProfileComponent,
    UploadProfileComponent,
    TeacherProfileComponent,
    EducationDialogComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [/*{provide: ErrorHandler, useClass: GlobalErrorHandler},*/
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  {provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
