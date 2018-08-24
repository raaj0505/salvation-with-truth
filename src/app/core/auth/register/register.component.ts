import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
          this.router.navigate(['/list']);
        }, err => console.log(err)
      );
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this.router.navigate(['/list']);
      }, error => {
        console.error(error);
        this.errorMessage = error.message;
        this.successMessage = '';
      });
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
