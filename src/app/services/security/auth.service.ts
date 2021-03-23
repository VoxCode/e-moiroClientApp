import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'identity/login';
  private registerPath = environment.apiUrl + 'identity/register';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  public isUserAuthenticated = (userRole: string): boolean => {
    return this.getRole() === userRole;
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
  }

  public getRedirectPath(role: string): string {
    switch (role) {
      case 'Administrator': {
        return 'admin';
      }
      case 'Creator': {
        return 'creator';
      }
      case 'Editor': {
        return 'editor';
      }
      case 'Dean': {
        return 'dean';
      }
      case 'Viewer': {
        return 'viewer';
      }
    }
  }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data);
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  // tslint:disable-next-line:typedef
  saveToken(token) {
    localStorage.setItem('token', token);
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('token');
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return localStorage.getItem('token');
  }
}
