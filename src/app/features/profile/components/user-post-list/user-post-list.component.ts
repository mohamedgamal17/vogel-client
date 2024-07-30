import { Component, Input, OnInit } from '@angular/core';
import { DataState } from '../../../../core/models/appState';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Post } from '../../../../core/types/posts/post.interface';
import UserService from '../../../../core/services/users/user.service';
import PeopleService from '../../../../core/services/people/people.service';
import ApiResoponse from '../../../../core/types/api-response.interface';
import { AuthService, User } from '@auth0/auth0-angular';
import { PagingInfo } from '../../../../core/types/paging.interface';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrl: './user-post-list.component.css'
})
export class UserPostListComponent implements OnInit{

  @Input() userId : string

  private _dataState  = new BehaviorSubject<DataState>(DataState.LOADING);

  dataState$ = this._dataState.asObservable();

  private _scrollLoading =  new BehaviorSubject<boolean>(false)

  scrollLoading$ = this._scrollLoading.asObservable()

  pagingInfo? : PagingInfo 

  error? :any

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

  async loadNext() {

    const isLoading = await firstValueFrom(this.scrollLoading$)
    if (!isLoading) {
      if (this.pagingInfo?.hasNext) {
        this._scrollLoading.next(true)
        this.peopleService.getPersonPosts(this.userId,{
          cursor: this.pagingInfo.nextCursor!,
          limit: 10
        }).subscribe((resp) => {
          this.posts = [...this.posts, ...resp.data]
          this.pagingInfo = resp.pagingInfo
          this._scrollLoading.next(false)
        })

      }
    }
  }

}
