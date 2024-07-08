import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../../core/types/comments/comment.interface';
import { User } from '../../../../core/types/users/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CommentService from '../../../../core/services/comments/comment.service';
import { BehaviorSubject } from 'rxjs';
import CommentRequest from '../../../../core/services/comments/requests/comment.request';


@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrl: './comment-list-item.component.css'
})
export class CommentListItemComponent implements OnInit {

  @Input() comment: Comment
  @Input() user: User
  showEditForm: boolean = false;
  formGroup : FormGroup
  private _isEditing  = new BehaviorSubject<boolean>(false)
  isEditing$ = this._isEditing.asObservable()

  constructor(private fb: FormBuilder , private commentService : CommentService){

  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      content : [this.comment.content, Validators.required]
    })
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm
    console.log("Toggling")
    if(!this.showEditForm){
      this.formGroup.get('content')?.patchValue(this.comment.content) 
    }
  }

  edit($event: SubmitEvent) {
    if(this.formGroup.valid){
      this._isEditing.next(true)
      var request = <CommentRequest>{
        content : this.formGroup.value.content
      }
      this.commentService.update(this.comment.postId, this.comment.id,request)
        .subscribe((resp)=>{
          this.comment = resp.data
          this._isEditing.next(false)
          this.showEditForm = false
        })
    }
  }

}
