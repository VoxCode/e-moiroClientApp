import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    this.authService.register(this.registerForm.value).subscribe(data => {
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
