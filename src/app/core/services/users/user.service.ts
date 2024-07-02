import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../types/users/user.interface";
import Paging from "../../types/paging.interface";
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, retry, shareReplay, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import UserRequest from "./requests/user.request";
import ApiResoponse from "../../types/api-response.interface";


@Injectable({
     providedIn: "root"
})
export default class UserService {

     private baseUrl: string = environment.apiUrl + "/user"

     private _currentUser = new BehaviorSubject<void>(undefined);

     public currentUser$ = this._currentUser.pipe(
          mergeMap(()=> this.getProfile()),
          shareReplay(1)
     )

     constructor(private httpClient: HttpClient) {
          this.currentUser$ = this.currentUser$ ?? this.getProfile()
     }

     getProfile(): Observable<ApiResoponse<User>> {
          return this.httpClient.get<ApiResoponse<User>>(this.baseUrl);
     }

     hasProfile() {
          return this.currentUser$
               .pipe(
                    map(_ => true),
                    catchError(_ => of(false))
               )
     }

     create(request: UserRequest) {
          return this.httpClient.post<ApiResoponse<User>>(this.baseUrl, request)
               .pipe(
                    tap(()=> this._currentUser.next())
               )
     }

     update(request: UserRequest) {
          return this.httpClient.put<ApiResoponse<User>>(this.baseUrl, request)
               .pipe(
                    tap(()=> this._currentUser.next())
               )
          
     }
}