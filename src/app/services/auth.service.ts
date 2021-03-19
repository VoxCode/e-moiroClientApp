import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';
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

  public isUserAuthenticated = (): boolean => {
    const token = this.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public isUserViewer = (): boolean => {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken.role;
    return role === 'Viewer';
  }

  public isUserAdmin = (): boolean => {
    const token = this.getToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken.role;
    return role === 'Administrator';
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
