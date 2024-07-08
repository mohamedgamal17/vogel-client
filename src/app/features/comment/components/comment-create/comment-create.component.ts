import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CommentService from '../../../../core/services/comments/comment.service';
import UserService from '../../../../core/services/users/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/types/users/user.interface';
import { BehaviorSubject } from 'rxjs';
import CommentRequest from '../../../../core/services/comments/requests/comment.request';
import { Comment  as VogelComment} from '../../../../core/types/comments/comment.interface';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrl: './comment-create.component.css'
})
export class CommentCreateComponent implements OnInit {
  
  @Input() user: User;

  @Input() postId : string;

  @Output() created = new EventEmitter<VogelComment>()

  formGroup : FormGroup;

  private _isPosting =  new BehaviorSubject<boolean>(false);

  isPosting$ = this._isPosting.asObservable();

  constructor(private commentService : CommentService , private fb : FormBuilder){

  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      content :  ['' , Validators.required]
    })
  }

  create($event: any){
    $event.preventDefault()
    if(this.formGroup.valid){
      this._isPosting.next(true)
      var obj = this.formGroup.value
      var request : CommentRequest = {
        content : obj.content
      }  

      this.commentService.create(this.postId, request)
        .subscribe((resp)=>{
          this.created.emit(resp.data)
          this.formGroup.reset()
          this._isPosting.next(false)
        })
    }
  }


}
