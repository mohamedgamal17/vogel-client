import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from './services/users/user.service';
import PostService from './services/posts/post.service';
import CommentService from './services/comments/comment.service';
import MediaService from './services/medias/media.service';
import { HeaderComponent } from './components/header/header.component';
import { DataTimeAgoPipe } from './pipes/data-time-ago.pipe';




@NgModule({
  declarations: [
    HeaderComponent,
    DataTimeAgoPipe
  ],
  imports: [
  ],
  providers :[UserService, PostService, CommentService, MediaService],
  exports:[HeaderComponent, DataTimeAgoPipe]
})
export class CoreModule { }
