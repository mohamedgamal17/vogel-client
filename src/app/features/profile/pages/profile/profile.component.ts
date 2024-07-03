import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable , map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userId$ : Observable<string>

  constructor(private router : Router, private activatedRoute : ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.userId$ = this.activatedRoute.params.pipe(
      map((pr)=> pr['id'])
    )
  }

}
