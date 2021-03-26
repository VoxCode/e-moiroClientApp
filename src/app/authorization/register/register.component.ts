import {Component, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild ('errorFrame') public modal: any;
  registerForm: FormGroup;
  public closeForm: Subject<any> = new Subject<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public modalRef: MDBModalRef) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.minLength(5), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
   }

  // tslint:disable-next-line:typedef
  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.modalRef.hide();
      this.closeForm.next();
    }, () => {
      this.modal.show();
    });
  }

  // tslint:disable-next-line:typedef
  get username() {
    return this.registerForm.get('username');
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.registerForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.registerForm.get('password');
  }
}
