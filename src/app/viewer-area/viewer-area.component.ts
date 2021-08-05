import { Component } from '@angular/core';
import {AuthService} from '../services/security/auth.service';

@Component({
  selector: 'app-viewer-area',
  templateUrl: './viewer-area.component.html',
  styleUrls: ['./viewer-area.component.scss']
})
export class ViewerAreaComponent {
  constructor(
    private authService: AuthService) { }

  userLogout(): void {
    this.authService.logout();
  }
}
