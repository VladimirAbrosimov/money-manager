import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, ReplaySubject} from "rxjs";
import {catchError, filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configurationSubject = new ReplaySubject<any>(1);

  constructor(
    private httpClient: HttpClient
  ) {
    this.load();
  }

  load(): void {
    this.httpClient.get('/assets/config.json').pipe(
      catchError(() => of(null)),
      filter(Boolean)
    ).subscribe((configuration: any) => this.configurationSubject.next(configuration));
  }

  getValue(key: string, defaultValue?: any): Observable<any> {
    return this.configurationSubject.pipe(
        map((configuration: any) => configuration[key] || defaultValue),
      );
  }
}

export function initConfig(configurationService: ConfigurationService) {
  return () => configurationService.load();
}
