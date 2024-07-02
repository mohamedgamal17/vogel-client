import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import UserService from '../services/users/user.service';
import { BehaviorSubject, Observable, catchError , firstValueFrom, map, of, tap } from 'rxjs';



export const profileGuardFn: CanActivateFn = (route, state) => {
  return hasProfile(route)
};

const hasProfile  = (route : ActivatedRouteSnapshot) => {
  var router = inject(Router)
  var userService =  inject(UserService);
  return userService.getProfile()
    .pipe(
      map(_=> true),
      catchError(err=>{
        router.navigate(['/profile/create'])
        return of(false)
      })    
    )
}
