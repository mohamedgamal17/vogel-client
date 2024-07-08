import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentListItemComponent } from './components/comment-list-item/comment-list-item.component';
import { CommentCreateComponent } from './components/comment-create/comment-create.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CommentListComponent,
    CommentListItemComponent,
    CommentCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[CommentListComponent]
})
export class CommentModule { }
