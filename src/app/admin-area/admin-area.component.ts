import { Component } from '@angular/core';
import {AuthService} from '../services/security/auth.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.scss']
})
export class AdminAreaComponent {
  constructor(
    private authService: AuthService) { }

  userLogout(): void {
    this.authService.logout();
  }
}
