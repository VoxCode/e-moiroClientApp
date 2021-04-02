import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreatorGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserAuthenticated('Creator')) {
      return true;
    } else {
      this.router.navigate(['authorization']);
      return false;
    }
  }
}
