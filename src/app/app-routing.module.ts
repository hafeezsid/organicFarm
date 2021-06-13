import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app-guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product/product.component';
import { AdminMainComponent } from './system_admin/admin-main/admin-main.component';

const routes: Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent,canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'admin',component:AdminMainComponent,canActivate:[AuthGuard]},
{path:'products', component:ProductComponent},
{path:'productListing',component:ProductListingComponent},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
