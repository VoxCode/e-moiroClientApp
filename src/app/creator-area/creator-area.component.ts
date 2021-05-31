import { Component } from '@angular/core';
import {AuthService} from '../services/security/auth.service';

@Component({
  selector: 'app-creator-area',
  templateUrl: './creator-area.component.html',
  styleUrls: ['./creator-area.component.scss']
})
export class CreatorAreaComponent {
  constructor(
    private authService: AuthService) { }

  userLogout(): void {
    this.authService.logout();
  }
}
