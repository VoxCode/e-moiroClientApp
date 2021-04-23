import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {Router} from '@angular/router';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  @ViewChild ('successRegFrame') public modal: any;
  modalRefLogin: MDBModalRef;
  modalRefRegister: MDBModalRef;
  constructor(private authService: AuthService, private router: Router,  private modalService: MDBModalService) { }

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (role) {
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]).then();
    }
  }

  login(): void {
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      containerClass: '',
      animated: true,
    };
    if (this.modalRefRegister) {
      this.modalRefRegister.hide();
    }
    this.modalRefLogin = this.modalService.show(LoginComponent, modalOptions);
  }

  register(): void {
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      containerClass: '',
      animated: true,
    };
    if (this.modalRefLogin) {
      this.modalRefLogin.hide();
    }
    this.modalRefRegister = this.modalService.show(RegisterComponent, modalOptions);
    this.modalRefRegister.content.closeForm.subscribe(() => {
      this.modal.show();
      this.login();
    });
  }
}
