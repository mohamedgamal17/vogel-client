import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ApiResoponse from "../../types/api-response.interface";
import { Observable } from "rxjs";
import { User } from "../../types/users/user.interface";
import { Post } from "../../types/posts/post.interface";

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

  getPersonPosts(id :string) : Observable<ApiResoponse<Post[]>>{
    var url = this.baseUrl + "/" + id + "/" + "posts"
    return this.httpClient.get<ApiResoponse<Post[]>>(url)
  }

  getPersonPostById(id : string, postId : string) : Observable<ApiResoponse<Post>>
  {
    var url = this.baseUrl + "/" + id + "/" + "posts" + "/" + postId
    return this.httpClient.get<ApiResoponse<Post>>(url);
  }
}