import { Component, Input, OnInit } from '@angular/core';
import { DataState } from '../../../../core/models/appState';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../../../core/types/posts/post.interface';
import UserService from '../../../../core/services/users/user.service';
import PeopleService from '../../../../core/services/people/people.service';
import ApiResoponse from '../../../../core/types/api-response.interface';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrl: './user-post-list.component.css'
})
export class UserPostListComponent implements OnInit{

  @Input() userId : string

  private _dataState  = new BehaviorSubject<DataState>(DataState.LOADING);

  dataState$ = this._dataState.asObservable();

  DataState  = DataState

  posts : Post[] = []
  
  constructor(public authService : AuthService,private peopleService : PeopleService ){

  }
  
  ngOnInit(): void {
    this.peopleService.getPersonPosts(this.userId)
      .subscribe((resp)=>{
        this.posts = resp.data
        this._dataState.next(DataState.LOADED)
      })
  }

  addNewPost(post :Post){
    this.posts = [post, ...this.posts]
  }

}
