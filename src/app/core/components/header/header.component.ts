import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import $ from "jquery";
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import UserService from '../../services/users/user.service';
import { User } from '../../types/users/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent implements OnInit, AfterViewInit {

  showProfileMenu: boolean = false;
  currentUser$: Observable<User | null>;
  constructor(public authService: AuthService, private userService: UserService) {

  }
  ngOnInit(): void {
 
  }



  ngAfterViewInit(): void {
    $(".msg-trigger-btn").on("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      var $this = $(this);
      var $prevTartget = $(this).parent().siblings().children(".msg-trigger-btn").attr('href');
      var target = $this.attr('href');

      if (target) {
        $(target).slideToggle();
      }

      if ($prevTartget) {
        $($prevTartget).slideUp();
      }
    });
  }

 

}
