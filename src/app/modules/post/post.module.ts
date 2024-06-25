import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostComponent } from './pages/post/post.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports:[PostComponent]
})
export class PostModule { }
