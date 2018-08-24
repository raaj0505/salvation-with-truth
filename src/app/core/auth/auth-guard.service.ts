import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Store, select } from '@ngrx/store';

import { selectorAuth } from './auth.reducer';
import {UserService} from '@app/core/auth/user.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public userService: UserService, private router: Router) {
  }
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/user']);
          return resolve(false);
        }, err => {
          return resolve(true);
        });
    });
  }
}
