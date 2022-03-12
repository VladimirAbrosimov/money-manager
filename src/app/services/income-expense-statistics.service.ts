import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NoteCategory} from '../models/note-category';
import {IncomeExpenseStatisticsForCategory} from '../models/income-expense-statistics-for-category';
import {NoteType} from "../models/note-type";
import {IncomeExpenseStatisticsForType} from "../models/income-expense-statistics-for-type";
import {IncomeExpenseStatisticsForMonth} from "../models/income-expense-statistics-for-month";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseStatisticsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getTotalAmountInCurrentMonth(): Observable<number> {
    return this.http.get(
      environment.SERVER_URL + '/getTotalAmountInCurrentMonth',
      {
        responseType: 'json'
      }
    ).pipe(map((totalAmount: any) => {
      return totalAmount;
    }));
  }

  getIncomeExpenseStatisticsInCurrentMonthSortedByType(): Observable<IncomeExpenseStatisticsForType[]> {
    return this.http.get(
      environment.SERVER_URL + '/getIncomeExpenseStatisticsInCurrentMonthSortedByType',
      {
        responseType: 'json'
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map(IncomeExpenseStatisticsService.parseIncomeExpenseStatisticsForTypeData);
    }));
  }

  getIncomeExpenseStatisticsInCurrentMonthByTypeSortedByCategory(noteType: NoteType): Observable<IncomeExpenseStatisticsForCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      environment.SERVER_URL + '/getIncomeExpenseStatisticsInCurrentMonthByTypeSortedByCategory',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map(IncomeExpenseStatisticsService.parseIncomeExpenseStatisticsForCategoryData);
    }));
  }

  getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory(noteType: NoteType): Observable<IncomeExpenseStatisticsForCategory[]> {
    const params = new HttpParams()
      .set('type', noteType);

    return this.http.get(
      environment.SERVER_URL + '/getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory',
      {
        responseType: 'json',
        params: params
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map(IncomeExpenseStatisticsService.parseIncomeExpenseStatisticsForCategoryData);
    }));
  }

  getIncomeExpenseStatisticsForCurrentYearSortedByMonth(): Observable<IncomeExpenseStatisticsForMonth[]> {
    return this.http.get(
      environment.SERVER_URL + '/getIncomeExpenseStatisticsForCurrentYearSortedByMonth',
      {
        responseType: 'json'
      }
    ).pipe(map((statisticsList: any) => {
      return statisticsList.map(IncomeExpenseStatisticsService.parseIncomeExpenseStatisticsForMonthData);
    }));
  }


  private static parseIncomeExpenseStatisticsForTypeData(incomeExpenseStatisticsForType: any): IncomeExpenseStatisticsForType {
    const type: NoteType = incomeExpenseStatisticsForType.type;
    const amount: number = incomeExpenseStatisticsForType.amount;

    return {
      type,
      amount
    }
  }

  private static parseIncomeExpenseStatisticsForCategoryData(incomeExpenseStatisticsForCategory: any): IncomeExpenseStatisticsForCategory {
    const category: NoteCategory = {
      type: incomeExpenseStatisticsForCategory.category.type,
      name: incomeExpenseStatisticsForCategory.category.name,
      color: incomeExpenseStatisticsForCategory.category.color
    }
    const amount: number = incomeExpenseStatisticsForCategory.amount;

    return {
      category,
      amount
    }
  }

  private static parseIncomeExpenseStatisticsForMonthData(incomeExpenseStatisticsForMonth: any): IncomeExpenseStatisticsForMonth {
    const yearMonth: string = incomeExpenseStatisticsForMonth.yearMonth;
    const expenseAmount: number = incomeExpenseStatisticsForMonth.expenseAmount;
    const incomeAmount: number = incomeExpenseStatisticsForMonth.incomeAmount;
    const totalAmount: number = incomeExpenseStatisticsForMonth.totalAmount;

    return {
      yearMonth,
      expenseAmount,
      incomeAmount,
      totalAmount
    }
  }
}
