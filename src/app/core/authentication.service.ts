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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static END_POINT = environment.REST_API + "/auth/login";
  private user: User;

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(login: Login): Observable<User> {
    return this.httpService
      .post(AuthService.END_POINT, login)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken;
          this.user.username = jwtHelper.decodeToken(jsonToken.token).username;
          this.user.email = jwtHelper.decodeToken(jsonToken.token).email;
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          console.log(jwtHelper.decodeToken(jsonToken.token));
          return this.user;
        })
      );
  }

  logout(): void {
    this.user = undefined;
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
}
