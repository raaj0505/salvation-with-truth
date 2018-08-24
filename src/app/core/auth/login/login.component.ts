import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/core/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';
  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/list']);
      });
  }
  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/list']);
      }, err => {
        console.error(err);
        this.errorMessage = err.message;
      });
  }
  createAccount(){
    this.router.navigate(['/register']);
  }

}
