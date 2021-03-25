import {Component, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild ('errorFrame') public modal: any;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(5), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.authService.saveToken(data.token);
      const role = this.authService.getRole();
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]);
    }, () => {
      this.modal.show();
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
