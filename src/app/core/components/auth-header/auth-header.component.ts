import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import UserService from '../../services/users/user.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../../types/users/user.interface';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css'
})
export class AuthHeaderComponent implements OnInit{

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
