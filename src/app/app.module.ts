import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { StickyNavModule } from 'ng2-sticky-nav'
import { RegistrationConfirmationComponent } from './registration-confirmation/registration-confirmation.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { UploadProfileComponent } from './upload-profile/upload-profile.component';


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
    UploadProfileComponent
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
    StickyNavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
