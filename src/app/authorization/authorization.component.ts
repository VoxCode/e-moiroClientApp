import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (role) {
      const redirectPath = this.authService.getRedirectPath(role);
      this.router.navigate([redirectPath]);
    }
  }

}
