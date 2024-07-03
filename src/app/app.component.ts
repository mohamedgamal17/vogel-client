import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'vogel-client';

  constructor(private authService: AuthService) {
    
  }
  ngOnInit(): void {
  }



  login(){
    this.authService.loginWithRedirect()
  }
}
