import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UsersComponent } from './users/users.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',component : LoginFormComponent},
  {path:'admin', component : AdminComponent, canActivate : [AuthGuard]},
  {path:'products', component : ProductsListComponent, canActivate : [AuthGuard]},
  {path:'users', component : UsersComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminComponent, ProductsListComponent, UsersComponent, LoginFormComponent];
