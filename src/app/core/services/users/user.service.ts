import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../types/users/user.interface";
import Paging from "../../types/paging.interface";
import { Observable, retry } from "rxjs";
import { environment } from "../../../../environments/environment";
import UserRequest from "./requests/user.request";
import ApiResoponse from "../../types/api-response.interface";

@Injectable({
     providedIn: "root"
})
export default class UserService {
  
     private baseUrl : string = environment.apiUrl + "/users"

     constructor(private httpClient: HttpClient) {

     }

     getAll(){
          return this.httpClient.get<ApiResoponse<User>>(this.baseUrl)
     }

     getById(id : string)  {
          return this.httpClient.get<ApiResoponse<User>>(this.baseUrl + "/" + id);
     }

     create(request : UserRequest) {
          return this.httpClient.post<ApiResoponse<User>>(this.baseUrl, request)
     }

     update(id : string,request : UserRequest)
     {
          return this.httpClient.put<ApiResoponse<User>>(this.baseUrl + "/" + id, request);
     }
}