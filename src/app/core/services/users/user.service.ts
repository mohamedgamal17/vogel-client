import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../types/users/user.interface";
import Paging from "../../types/paging.interface";
import { Observable, retry } from "rxjs";
import { environment } from "../../../../environments/environment";
import UserRequest from "./requests/user.request";

@Injectable({
     providedIn: "root"
})
export default class UserService {
  
     private baseUrl : string = environment.apiUrl + "/users"

     constructor(private httpClient: HttpClient) {

     }

     getAll(): Observable<Paging<User>> {
          return this.httpClient.get<Paging<User>>(this.baseUrl)
     }

     getById(id : string) : Observable<User> {
          return this.httpClient.get<User>(this.baseUrl + "/" + id);
     }

     create(request : UserRequest) : Observable<User>{
          return this.httpClient.post<User>(this.baseUrl, request)
     }

     update(id : string,request : UserRequest) : Observable<User>
     {
          return this.httpClient.put<User>(this.baseUrl + "/" + id, request);
     }


}