import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { profileGuardFn } from '../../core/guards/profile.guard';

const routes: Routes = [
  {  path:"posts", component: PostComponent , canActivate:[authGuardFn, profileGuardFn]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
