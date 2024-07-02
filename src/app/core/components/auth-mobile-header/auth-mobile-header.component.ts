import { Component, OnInit } from '@angular/core';
import { User } from '../../types/users/user.interface';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';
import UserService from '../../services/users/user.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-auth-mobile-header',
  templateUrl: './auth-mobile-header.component.html',
  styleUrl: './auth-mobile-header.component.css'
})
export class AuthMobileHeaderComponent implements OnInit {
  currentUser$  : Observable<User|null>

  showProfileMenu : boolean = false

  constructor(public authService : AuthService, private userService : UserService){

  }
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.currentUser$ = this.userService.currentUser$.pipe(
          map((resp)=> resp.data),
          catchError(err=>{
            console.log(err)
            return of(null)
          })
        )
      }
    })
  }

 toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }
  login() {
    this.authService.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  }

  logout(){
    this.authService.logout()
  }
}
