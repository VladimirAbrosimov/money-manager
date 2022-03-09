import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteCategory } from '../models/note-category';
import { TotalMoney } from '../models/total-money';
import {NoteType} from "../models/note-type";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseStatisticsService {
  private readonly SERVER_URL: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  getTotalMoneyInCurrentMonth(): Observable<number> {
    return this.http.get(
      this.SERVER_URL + '/getTotalMoneyInCurrentMonth',
      {
        responseType: 'json'
      }
    ).pipe(map((totalMoney: any) => {
      return totalMoney;
    }));
  }

  getTotalMoneyInCurrentMonthByType(noteType: NoteType): Observable<number> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      this.SERVER_URL + '/getTotalMoneyInCurrentMonthByType',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((totalMoney: any) => {
      return totalMoney;
    }));
  }

  getTotalMoneyInCurrentMonthByTypeSortedByCategory(noteType: NoteType): Observable<TotalMoney[]> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      this.SERVER_URL + '/getTotalMoneyInCurrentMonthByTypeSortedByCategory',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((totalMoneys: any) => {
      return totalMoneys.map((totalMoney: any) => {
        const category: NoteCategory = new NoteCategory(totalMoney.category.type, totalMoney.category.name, totalMoney.category.color);
        const amount = totalMoney.amount;

        return {
          category,
          amount
        }
      });
    }));
  }


}
