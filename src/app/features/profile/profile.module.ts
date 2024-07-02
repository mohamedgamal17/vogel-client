import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileFormComponent,
    CreateProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class ProfileModule { }
