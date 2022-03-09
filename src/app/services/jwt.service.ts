import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private cookieService: CookieService
  ) { }

  setToken(token: string) {
    this.cookieService.set('token', token);
    this.token = token;
  }

  deleteToken() {
    const voidToken = '';
    this.setToken(voidToken);
  }

  getToken() {
    return this.token ? this.token : null;
  }

  getDecodedToken() {
    return this.token ? jwt_decode(this.token) : null;
  }

  getUsername() {
    const decodedToken: any = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  }

  getUserRole() {
    const decodedToken: any = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }


  private token: string = this.cookieService.get('token');
}
