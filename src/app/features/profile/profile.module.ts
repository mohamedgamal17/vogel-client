import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileBannerComponent } from './components/profile-banner/profile-banner.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostModule } from '../post/post.module';
import { UserPostListComponent } from './components/user-post-list/user-post-list.component';


@NgModule({
  declarations: [
    ProfileFormComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
    ProfileBannerComponent,
    ProfileComponent,
    UserPostListComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule,
    SharedModule,
    PostModule
  ]
})
export class ProfileModule { }
