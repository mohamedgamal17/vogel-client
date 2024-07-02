import { Component, OnInit } from '@angular/core';
import UserService from '../../../../core/services/users/user.service';
import UserRequest from '../../../../core/services/users/requests/user.request';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent implements OnInit {

  private isPosting = new BehaviorSubject<boolean>(false);

  isPosting$ = this.isPosting.asObservable();

  constructor(private userService : UserService , private router : Router){
  }
  ngOnInit(): void {
     this.checkProfile();
  }

  async checkProfile(){
    var hasProfile =  await firstValueFrom(this.userService.hasProfile())
    if(hasProfile){
      this.router.navigate(['/profile/edit'])
    }

  }

  createUserProfile(userRequest : UserRequest){
    this.isPosting.next(true);

    this.userService.create(userRequest)
      .subscribe((resp)=>{
        this.isPosting.next(false)  
        Swal.fire("profile","<p>your profile has been created</p>", "success")
            
         
        this.router.navigate(['/profile/edit'])
      })
  }
}
