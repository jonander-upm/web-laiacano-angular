import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AuthService} from "../../core/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenRequest = request;
    const token = this.auth.getToken();
    if(token) {
      tokenRequest = tokenRequest.clone({
        setHeaders: {Authorization: "Bearer ${token}"}
      });
    }
    return next.handle(tokenRequest).pipe(map(
      (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          let newToken = event.headers.get("Authorization");
          if(newToken) {
            this.auth.setToken(newToken);
          }
        }
        return event;
      }));
  }
}
