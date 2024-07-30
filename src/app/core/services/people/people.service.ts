import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ApiResoponse from "../../types/api-response.interface";
import { Observable } from "rxjs";
import { User } from "../../types/users/user.interface";
import { Post } from "../../types/posts/post.interface";
import { createHttpParams } from "../../utilites/http-param.utility";
import PagingParams from "../paging-params.request";

@Injectable()
export default class PeopleService{

  private baseUrl =  environment.apiUrl + "/people"

  constructor(private httpClient: HttpClient){

  }

  getAll() :Observable<ApiResoponse<User[]>>{
    return this.httpClient.get<ApiResoponse<User[]>>(this.baseUrl)
  }

  getById(id : string) : Observable<ApiResoponse<User>>{
    return this.httpClient.get<ApiResoponse<User>>(this.baseUrl + "/" + id)
  }

  getPersonPosts(id :string , paginParams? : PagingParams) : Observable<ApiResoponse<Post[]>>{
    var optiosn = {
      params :createHttpParams(paginParams)
    }
    var url = this.baseUrl + "/" + id + "/" + "posts"
    return this.httpClient.get<ApiResoponse<Post[]>>(url,optiosn)
  }

  getPersonPostById(id : string, postId : string) : Observable<ApiResoponse<Post>>
  {
    var url = this.baseUrl + "/" + id + "/" + "posts" + "/" + postId
    return this.httpClient.get<ApiResoponse<Post>>(url);
  }
}