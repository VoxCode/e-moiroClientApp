import { Component } from '@angular/core';
import {AuthService} from '../services/security/auth.service';

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss']
})
export class EditorAreaComponent {
  constructor(
    private authService: AuthService) { }

  userLogout(): void {
    this.authService.logout();
  }
}
