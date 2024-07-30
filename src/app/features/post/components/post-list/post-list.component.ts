import { Component, HostListener, OnInit } from '@angular/core';
import PostService from '../../../../core/services/posts/post.service';
import AppDataState, { DataState } from '../../../../core/models/appState';
import ApiResoponse from '../../../../core/types/api-response.interface';
import { Post } from '../../../../core/types/posts/post.interface';
import { BehaviorSubject, Observable,  firstValueFrom } from 'rxjs';
import { PagingInfo } from '../../../../core/types/paging.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  private dataState = new BehaviorSubject<DataState>(DataState.LOADING);
  private scrollLoading = new BehaviorSubject<boolean>(false);
  scrollLoading$ = this.scrollLoading.asObservable()
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
      }, err => {
        this.dataState.next(DataState.ERROR);
        this.error = err
      })

  }


  addNewPost(post: Post) {
    console.log(post)
    this.posts = [post, ...this.posts]
  }


  async loadNext() {

    const isLoading = await firstValueFrom(this.scrollLoading)

    if (!isLoading) {
      if (this.pagingInfo?.hasNext) {
        this.scrollLoading.next(true)
        this.postService.getAll({
          cursor: this.pagingInfo.nextCursor!,
          limit: 10
        }).subscribe((resp) => {
          this.posts = [...this.posts, ...resp.data]
          this.pagingInfo = resp.pagingInfo
          this.scrollLoading.next(false)
        })

      }
    }

  }


}
