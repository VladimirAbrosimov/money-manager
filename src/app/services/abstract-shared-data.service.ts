import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractSharedDataService<T> {

  protected constructor() { }

  private editDataDetails: T = null;
  private messageSource = new  BehaviorSubject(this.editDataDetails);

  public currentMessage = this.messageSource.asObservable();

  public changeMessage(message: T) {
    this.messageSource.next(message);
  }
}
