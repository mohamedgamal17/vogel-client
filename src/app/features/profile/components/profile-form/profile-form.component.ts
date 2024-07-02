import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../core/types/users/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import MediaService from '../../../../core/services/medias/media.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import UserRequest from '../../../../core/services/users/requests/user.request';
import { Gender } from '../../../../core/types/users/gender.enum';
import { DataState } from '../../../../core/models/appState';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent  implements OnInit{

  @Input() title = "My Profile"

  @Input() profile : User | undefined

  @Output() profileUpdated =  new EventEmitter<UserRequest>();

  @Input() isPosting  = false;

  formGroup : FormGroup

  private isUploading = new BehaviorSubject<boolean>(false)

  isUploading$ = this.isUploading.asObservable()

  submitted = false;


  constructor(private fb : FormBuilder,private mediaService : MediaService){
    
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName : [this.profile?.firstName , [Validators.required, Validators.min(2), Validators.max(256)]],
      lastName : [this.profile?.lastName , [Validators.required,  Validators.min(2), Validators.max(256)]],
      gender : [this.profile?.gender,  [Validators.required]],
      birthDate : [formatDate(this.profile?.birthDate ?? new Date(), "yyyy-MM-dd",'en'), [Validators.required]],
      avatar : [this.profile?.avatar]
    })
  }

  updateImage(event : any){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.isUploading.next(true);
      this.mediaService.create(file)
        .subscribe((event)=>{
          if (event.type == HttpEventType.UploadProgress) {
            var progress = Math.round((100 * event.loaded) / event.total!);
          } else if (event.type == HttpEventType.Response) {
            this.formGroup.patchValue({
              avatar: event.body?.data
            })

            this.isUploading.next(false);
          }
        })
    }
  }

  removeImage(){
    if(this.formGroup.get('avatar')?.value){
      this.formGroup.patchValue({
        avatar : null
      })
    }
  }

  async updateProfile($event : any){
    this.submitted = true
    $event.preventDefault()
    const isUploading =  await firstValueFrom(this.isUploading);
    console.log(this.formGroup.value)
    if(this.formGroup.valid && !isUploading){
      console.log('valid')
      var obj = this.formGroup.value;
      var request : UserRequest = {
        firstName : obj.firstName,
        lastName : obj.lastName,
        gender : parseInt(obj.gender),
        birthDate : obj.birthDate,
        avatarId : obj?.avatar?.id
      } 

      this.profileUpdated.emit(request)
    }
  }



}
