import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService // ?
  ) {
  }

  isAuthenticated(): boolean {
    return !!this.jwtService.getToken(); // ?
  }

  getUsername() {
    return this.jwtService.getUsername();
  }

  authUser(user: User) {
    const body = {username: user.username, password: user.password};

    return this.http.post(
      environment.SERVER_URL + '/auth',
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      }
    ).pipe(map((token: string) => {
      if (token) {
        this.jwtService.setToken(token);
        return "success";
      }
      return "fail"
    }));
  }

  logoutUser() {
    this.jwtService.setToken('');
  }

  addUser(user: User) {
    const body = {username: user.username, password: user.password, passwordConfirm: user.passwordConfirm};

    return this.http.post(
      environment.SERVER_URL + '/addUser',
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      }
    );
  }

  isUsernameUsed(username: string) {
    const params = new HttpParams()
      .set('username', username);

    return this.http.get(
      environment.SERVER_URL + '/isUsernameUsed',
      {
        params: params
      }
    );
  }

}
