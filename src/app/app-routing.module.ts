import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { AcknowledgmentComponent } from './acknowledgment/acknowledgment.component';
import { AuthGuard } from './app-guards/auth.guard';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationConfirmationComponent } from './registration-confirmation/registration-confirmation.component';
import { AdminMainComponent } from './system_admin/admin-main/admin-main.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherDetailComponent } from './tutor/teacher-detail/teacher-detail.component';
import { TeacherListComponent } from './tutor/teacher-list/teacher-list.component';


const routes: Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'registrationConfirmation',component:RegistrationConfirmationComponent},
{path:'accountConfirmation/:key',component:AccountConfirmationComponent},
{path:'register/step1',component:CreateProfileComponent},
{path:'register/step2',component:TeacherProfileComponent},
{path:'register/final',component:AcknowledgmentComponent},
{path:'tutor/search',component:TeacherListComponent},
{path:'tutor/:tutorId/details',component:TeacherDetailComponent},
{path:'logout',component:LogoutComponent},
{path:'admin',component:AdminMainComponent,canActivate:[AuthGuard]},
{path:'productListing',component:ProductListingComponent},
{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled',anchorScrolling:'enabled',scrollOffset: [0, 64]})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
