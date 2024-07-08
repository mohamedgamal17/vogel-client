import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../core/types/users/user.interface';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import UserService from '../../../../core/services/users/user.service';
import AppDataState, { DataState } from '../../../../core/models/appState';
import ApiResoponse from '../../../../core/types/api-response.interface';
import CommentService from '../../../../core/services/comments/comment.service';
import { Comment  as VogelComment} from '../../../../core/types/comments/comment.interface';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  comments : VogelComment [] = []

  private _dataState = new BehaviorSubject<DataState>(DataState.LOADING)

  dataState$  = this._dataState.asObservable();

  
  DataState = DataState
  @Input() postId : string

  user$: Observable<User> 

  constructor (private commentService : CommentService ,private userService : UserService){

  }
  ngOnInit(): void {
    this.user$ = this.userService.currentUser$.
      pipe(
        map(resp=> resp.data)
      )
    this.commentService.getAll(this.postId)
      .subscribe((resp)=>{
        this.comments = [...resp.data]
        this._dataState.next(DataState.LOADED)    
      })
  }

  addNewComment(comment : VogelComment){
    this.comments = [comment , ...this.comments]
  }

 





}
