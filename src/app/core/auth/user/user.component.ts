import { Component, OnInit } from '@angular/core';
import {FirebaseUserModel} from '@app/core/auth/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/core/auth/user.service';
import {AuthService} from '@app/core/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'anms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  constructor(public userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }
  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
  }
  logout() {
    this.authService.doLogout()
      .then(res => {
        this.location.back();
      }, err => {
        console.error('logout error: ', err);
      });
  }

}
