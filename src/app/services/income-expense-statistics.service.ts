import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NoteCategory} from '../models/note-category';
import {IncomeExpenseStatisticsForCategory} from '../models/income-expense-statistics-for-category';
import {NoteType} from "../models/note-type";
import {IncomeExpenseStatisticsForType} from "../models/income-expense-statistics-for-type";
import {IncomeExpenseStatisticsForMonth} from "../models/income-expense-statistics-for-month";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseStatisticsService {
  private readonly SERVER_URL: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {
  }

  getTotalAmountInCurrentMonth(): Observable<number> {
    return this.http.get(
      this.SERVER_URL + '/getTotalAmountInCurrentMonth',
      {
        responseType: 'json'
      }
    ).pipe(map((totalAmount: any) => {
      return totalAmount;
    }));
  }

  getIncomeExpenseStatisticsInCurrentMonthSortedByType(): Observable<IncomeExpenseStatisticsForType[]> {
    return this.http.get(
      this.SERVER_URL + '/getIncomeExpenseStatisticsInCurrentMonthSortedByType',
      {
        responseType: 'json'
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map((statistics: any) => {
        const type: NoteType = statistics.type;
        const amount: number = statistics.amount;

        return {
          type,
          amount
        }
      });
    }));
  }

  getIncomeExpenseStatisticsInCurrentMonthByTypeSortedByCategory(noteType: NoteType): Observable<IncomeExpenseStatisticsForCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      this.SERVER_URL + '/getIncomeExpenseStatisticsInCurrentMonthByTypeSortedByCategory',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map((statistics: any) => {
        const category: NoteCategory = new NoteCategory(statistics.category.type, statistics.category.name, statistics.category.color);
        const amount: number = statistics.amount;

        return {
          category,
          amount
        }
      });
    }));
  }

  getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory(noteType: NoteType): Observable<IncomeExpenseStatisticsForCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      this.SERVER_URL + '/getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map((statistics: any) => {
        const category: NoteCategory = new NoteCategory(statistics.category.type, statistics.category.name, statistics.category.color);
        const amount: number = statistics.amount;

        return {
          category,
          amount
        }
      });
    }));
  }


  getIncomeExpenseStatisticsForCurrentYearSortedByMonth(): Observable<IncomeExpenseStatisticsForMonth[]> {
    return this.http.get(
      this.SERVER_URL + '/getIncomeExpenseStatisticsForCurrentYearSortedByMonth',
      {
        responseType: 'json'
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map((statistics: any) => {
        const yearMonth: string = statistics.yearMonth;
        const expenseAmount: number = statistics.expenseAmount;
        const incomeAmount: number = statistics.incomeAmount;
        const totalAmount: number = statistics.totalAmount;

        return {
          yearMonth,
          expenseAmount,
          incomeAmount,
          totalAmount
        }
      });
    }));
  }

}
