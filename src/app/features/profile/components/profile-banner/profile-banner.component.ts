import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import PeopleService from '../../../../core/services/people/people.service';
import AppDataState, { DataState } from '../../../../core/models/appState';
import ApiResoponse from '../../../../core/types/api-response.interface';
import { AppState, AuthService } from '@auth0/auth0-angular';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { User } from '../../../../core/types/users/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.css'
})
export class ProfileBannerComponent implements OnInit, AfterViewInit {

  @Input() userId: string;

  appState$: Observable<AppDataState<ApiResoponse<User>>>

  DataState = DataState
  constructor(public authService: AuthService, private peopleService: PeopleService, private router: Router) {

  }
  ngAfterViewInit(): void {
    $(document).ready(function () {
      var bgSelector = $(".bg-img");
      bgSelector.each(function (index, elem) {
        var element = $(elem),
          bgSource = element.data('bg');
        element.css('background-image', 'url(' + bgSource + ')');
      });
    })
  }

  ngOnInit(): void {

    this.appState$ = this.peopleService.getById(this.userId)
      .pipe(
        startWith(<AppDataState<ApiResoponse<User>>>{ state: DataState.LOADING }),

        map(res => {
          return <AppDataState<ApiResoponse<User>>>{
            data: res,
            state: DataState.LOADED
          }
        })
        ,
        catchError(err => {
          return of(<AppDataState<ApiResoponse<User>>>{ error: err, state: DataState.ERROR })
        })
      )
  }


  redirectToEditPage() {
    this.router.navigate(['profile/edit'])
  }

}
