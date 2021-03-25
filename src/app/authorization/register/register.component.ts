import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild ('errorFrame') public modal: any;
  @ViewChild ('frame') public modal2: any;
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.minLength(5), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
   }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.modal2.hide();
      this.router.navigate(['authorization']);
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
