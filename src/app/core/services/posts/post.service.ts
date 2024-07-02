import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PostRequest } from "./requests/post.request";
import { Post } from "../../types/posts/post.interface";
import ApiResoponse from "../../types/api-response.interface";

@Injectable({
     providedIn : "root"
})

export default class PostService{

     private baseUrl = environment.apiUrl + "/" + "posts"

     constructor(private httpClient : HttpClient){}

     getAll(){
          return this.httpClient.get<ApiResoponse<Post[]>>(this.baseUrl);
     }

     getById(id :string){
          return this.httpClient.get<ApiResoponse<Post>>(this.baseUrl + "/" +id)
     }

     create(request : PostRequest){
          return this.httpClient.post<ApiResoponse<Post>>(this.baseUrl , request)
     }

     update(id: string,  request : PostRequest){
          return this.httpClient.put<ApiResoponse<Post>>(this.baseUrl + "/" + id, request);
     }
     
}