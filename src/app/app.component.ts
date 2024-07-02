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
    this.authService.user$.subscribe((user)=> console.log(user))
    this.authService.getAccessTokenSilently().subscribe((t)=> console.log(t))

    console.log(environment)
  }



  login(){
    this.authService.loginWithRedirect()
  }
}
