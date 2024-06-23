import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserService from './services/users/user.service';
import PostService from './services/posts/post.service';
import CommentService from './services/comments/comment.service';
import MediaService from './services/medias/media.service';




@NgModule({
  declarations: [],
  imports: [
  ],
  providers :[UserService, PostService, CommentService, MediaService]
})
export class CoreModule { }
