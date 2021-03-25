import { Component } from '@angular/core';
import {AuthService} from '../services/security/auth.service';

@Component({
  selector: 'app-dean-area',
  templateUrl: './dean-area.component.html',
  styleUrls: ['./dean-area.component.scss']
})
export class DeanAreaComponent {
  constructor(
    private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  userLogout() {
    this.authService.logout();
  }
}
