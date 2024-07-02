import { Component, OnInit } from '@angular/core';
import PostService from '../../../../core/services/posts/post.service';
import AppDataState, { DataState } from '../../../../core/models/appState';
import ApiResoponse from '../../../../core/types/api-response.interface';
import { Post } from '../../../../core/types/posts/post.interface';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { PagingInfo } from '../../../../core/types/paging.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  private dataState = new BehaviorSubject<DataState>(DataState.LOADING);
  dataState$ = this.dataState.asObservable();
  posts: Post[] = []
  pagingInfo?: PagingInfo;
  error?: any
  appDataState$: Observable<AppDataState<ApiResoponse<Post[]>>>
  DataState = DataState

  constructor(private postService: PostService) {

  }


  ngOnInit(): void {
    this.postService.getAll()
      .subscribe((resp) => {
        this.dataState.next(DataState.LOADED);
        this.posts = [...resp.data]
        this.pagingInfo = resp.pagingInfo
      },err => {
        this.dataState.next(DataState.ERROR);
        this.error = err
      })
      
  }

  addNewPost(post : Post){
    console.log(post)
    this.posts = [post,...this.posts]
  }


}
