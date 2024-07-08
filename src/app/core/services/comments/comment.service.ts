import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import ApiResoponse from "../../types/api-response.interface";
import CommentRequest from "./requests/comment.request";
import { Comment  as VogelComment} from "../../types/comments/comment.interface";

@Injectable({
     providedIn :"root"
})
export default class CommentService {
    
     private baseUrl = environment.apiUrl + "/" + "posts" ;
     constructor(private httpClient : HttpClient) {
     }


     getAll(postId : string){
          var url = this.baseUrl + "/" + postId + "/" + "comments";
          return this.httpClient.get<ApiResoponse<VogelComment[]>>(url)
     }

     getById(postId : string, commentId : string){
          var url = this.baseUrl + "/" + postId + "/" + "comments"+"/" +commentId;
          return this.httpClient.get<ApiResoponse<VogelComment>>(url);
     }

     create(postId : string, request : CommentRequest){
          var url = this.baseUrl + "/" + postId + "/" + "comments";
          return this.httpClient.post<ApiResoponse<VogelComment>>(url,request);
     }


     update(postId : string , commentId : string, request : CommentRequest){
          var url = this.baseUrl + "/" + postId + "/" + "comments"+"/" +commentId;
          return this.httpClient.put<ApiResoponse<VogelComment>>(url, request);
     }
}