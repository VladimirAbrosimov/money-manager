import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serverURL: string = 'http://localhost:8080';

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
      this.serverURL + '/auth',
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
      this.serverURL + '/addUser',
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
      this.serverURL + '/isUsernameUsed',
      {
        params: params
      }
    );
  }

}
