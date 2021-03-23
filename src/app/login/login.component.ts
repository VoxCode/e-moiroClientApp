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

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (role) {
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]);
    }
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data.token);
      const role = this.authService.getRole();
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]);
      this.invalidLogin = false;
    }, () => {
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
