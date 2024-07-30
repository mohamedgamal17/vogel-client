import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PostRequest } from "./requests/post.request";
import { Post } from "../../types/posts/post.interface";
import ApiResoponse from "../../types/api-response.interface";
import PagingParams from "../paging-params.request";
import { param } from "jquery";
import { createHttpParams } from "../../utilites/http-param.utility";

@Injectable({
     providedIn: "root"
})

export default class PostService {

     private baseUrl = environment.apiUrl + "/" + "posts"

     constructor(private httpClient: HttpClient) { }

     getAll(queryParams : PagingParams | null = null) {
          var options = {
               params: createHttpParams(queryParams)
          }

          return this.httpClient.get<ApiResoponse<Post[]>>(this.baseUrl, options);
     }

     getById(id: string, params: any) {
          return this.httpClient.get<ApiResoponse<Post>>(this.baseUrl + "/" + id,)
     }

     create(request: PostRequest) {
          return this.httpClient.post<ApiResoponse<Post>>(this.baseUrl, request)
     }

     update(id: string, request: PostRequest) {
          return this.httpClient.put<ApiResoponse<Post>>(this.baseUrl + "/" + id, request);
     }

}