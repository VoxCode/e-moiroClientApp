import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import { Router } from '@angular/router';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  @ViewChild ('errorFrame') public modal: any;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public modalRef: MDBModalRef) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(5), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.modalRef.hide();
      this.authService.saveToken(data.token);
      const role = this.authService.getRole();
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]).then();
    }, () => {
      this.modal.show();
    });
  }

  get username(): AbstractControl { return this.loginForm.get('username'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }
}
