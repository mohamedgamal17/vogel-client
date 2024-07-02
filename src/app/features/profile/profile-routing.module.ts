import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { profileGuardFn } from '../../core/guards/profile.guard';

const routes: Routes = [
  {path:"profile/create", component: CreateProfileComponent,  canActivate :[authGuardFn] },
  {path:"profile/edit", component:UpdateProfileComponent, canActivate:[authGuardFn,profileGuardFn]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
