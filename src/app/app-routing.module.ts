import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
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


const routes: Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'registrationConfirmation',component:RegistrationConfirmationComponent},
{path:'accountConfirmation/:key',component:AccountConfirmationComponent},
{path:'createProfile',component:CreateProfileComponent},
{path:'logout',component:LogoutComponent},
{path:'admin',component:AdminMainComponent,canActivate:[AuthGuard]},
{path:'products', component:ProductComponent},
{path:'productListing',component:ProductListingComponent},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
