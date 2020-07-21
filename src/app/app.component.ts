import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  title = 'E.moiro';
constructor(private authService: AuthService ) {
}

  // tslint:disable-next-line:typedef
  userLogout() {
    this.authService.logout();
  }
}


