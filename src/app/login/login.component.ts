import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private invalidLogin: boolean;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  login() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data.token);
      this.invalidLogin = false;
      this.router.navigate(['**']);
    }, err => {
      this.invalidLogin = true;
    });
  }

  // tslint:disable-next-line:typedef
  get username() {
    return this.loginForm.get('username');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.loginForm.get('password');
  }

}
