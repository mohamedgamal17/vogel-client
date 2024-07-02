import { Component, OnInit } from '@angular/core';
import UserService from '../../../../core/services/users/user.service';
import { BehaviorSubject, Observable, catchError, of, map, startWith, tap } from 'rxjs';
import UserRequest from '../../../../core/services/users/requests/user.request';
import { User } from '../../../../core/types/users/user.interface';
import AppDataState, { DataState } from '../../../../core/models/appState';
import ApiResoponse from '../../../../core/types/api-response.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {

  private isPosting = new BehaviorSubject<boolean>(false);

  isPosting$ = this.isPosting.asObservable();

  appState$: Observable<AppDataState<ApiResoponse<User>>>;

  DataState  = DataState

  constructor(private userService: UserService) {
    this.appState$ = this.userService.currentUser$
    .pipe(
      map(res => {console.log(res); return <AppDataState<ApiResoponse<User>>>{
        data: res,
        state: DataState.LOADED
      }}),
      catchError(err => of(<AppDataState<ApiResoponse<User>>>{ error: err, state: DataState.ERROR })),
      startWith(<AppDataState<ApiResoponse<User>>>{ state: DataState.LOADING }),
    )
    
    this.appState$.subscribe((res)=> console.log(res));
  }
  ngOnInit(): void {
   
  }

  updateUserProfile(request: UserRequest) {
    this.isPosting.next(true);

    this.userService.update(request)
      .subscribe((resp) => {
        this.isPosting.next(false)
        Swal.fire("profile", `
            <p>Your profile has been updated
          `, "success")
      })
  }
}
