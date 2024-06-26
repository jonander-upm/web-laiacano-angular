import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

import {User} from "./user.model";
import {Role} from "./role.model";
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";
import {Login} from "../shared/dialogs/login-dialog/login.model";
import {Register} from "./register.model";
import {ResetPassword} from "./reset-password.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static LOGIN_END_POINT = environment.REST_API + "/auth/login";
  static REGISTER_END_POINT = environment.REST_API + "/auth/register";
  static FORGOT_PASSWORD_ENDPOINT = environment.REST_API + "/auth/forgot-password";
  static RESET_PASSWORD_ENDPOINT = environment.REST_API + "/auth/reset-password";
  private user: User;

  static TOKEN_STORAGE_KEY = 'lc-token';

  constructor(private httpService: HttpService, private router: Router) {
    const storedToken = localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
    if (storedToken) {
      this.user = this.mapUser({token: storedToken});
    }
  }

  register(register: Register): Observable<User> {
    return this.httpService
      .post(AuthService.REGISTER_END_POINT, register);
  }

  login(login: Login): Observable<User> {
    return this.httpService
      .post(AuthService.LOGIN_END_POINT, login)
      .pipe(
        map(jsonToken => {
          localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, jsonToken.token);
          return this.mapUser(jsonToken);
        })
      );
  }

  private mapUser(token: any): User {
    const jwtHelper = new JwtHelperService();
    this.user = token;
    this.user.username = jwtHelper.decodeToken(token.token).username;
    this.user.email = jwtHelper.decodeToken(token.token).email;
    this.user.role = jwtHelper.decodeToken(token.token).role;
    return this.user;
  }

  forgotPassword(username: string): Observable<void> {
    return this.httpService
      .param('username', username)
      .get(AuthService.FORGOT_PASSWORD_ENDPOINT);
  }

  resetPassword(resetPassword: ResetPassword): Observable<void> {
    return this.httpService
      .put(AuthService.RESET_PASSWORD_ENDPOINT, resetPassword);
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    this.router.navigate([""]).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(new JwtHelperService().isTokenExpired(this.user.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isManager(): boolean {
    return this.hasRoles([Role.MANAGER]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }

  getUsername(): string {
    return this.user ? this.user.username : "???";
  }

  getEmail(): string {
    return this.user ? this.user.email : undefined;
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  setToken(token: string): void {
    this.user.token = token;
  }
}
