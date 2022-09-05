import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RoleChangeModel} from '../../models/RoleChangeModel';
import {Globals} from '../../globals';
import {PermissionManagerService} from './permissions-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'identity/login';
  private registerPath = environment.apiUrl + 'identity/register';
  private changeRolePath = environment.apiUrl + 'identity/changeRole';

  constructor(
    private globals: Globals,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private permissionManager: PermissionManagerService) { }

  public isUserAuthenticated = (userRole: string): boolean => {
    return this.getRole() === userRole;
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.globals.role = this.getRedirectPath(decodedToken.role);
      this.globals.name = decodedToken.unique_name;
      this.globals.userId = decodedToken.nameid;
      this.permissionManager.reloadUserState();
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

  changeRole(roleChangeModel: RoleChangeModel): Observable<any> {
    return this.http.post(this.changeRolePath, roleChangeModel);
  }

  saveToken(token): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
