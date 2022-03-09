import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore: any = {};

  constructor() { }

  public get(key: string) {
      this.parseCookies();
      return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  public set(key: string, value: string) {
    document.cookie = key + '=' + (value || '');
  }

  private parseCookies(cookies = document.cookie) {    
    this.cookieStore = {};
    if (!!cookies === false) { return; }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
        const cookieArr = cookie.split('=');
        this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }
  
}
