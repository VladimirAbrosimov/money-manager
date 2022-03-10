import { Injectable } from '@angular/core';
import {IncomeExpenseStatisticsForCategory} from "../models/income-expense-statistics-for-category";
import {IncomeExpenseStatisticsForMonth} from "../models/income-expense-statistics-for-month";

@Injectable({
  providedIn: 'root'
})
export class ChartDataParserService {

  constructor() { }

  parseIncomeExpenseStatisticsForCategory(incomeExpenseStatisticsForCategories: IncomeExpenseStatisticsForCategory[]) {
    let names = [];
    let amounts = [];
    let colors = [];

    incomeExpenseStatisticsForCategories.forEach((incomeExpenseStatisticsForCategory: IncomeExpenseStatisticsForCategory) => {
      names.push(incomeExpenseStatisticsForCategory.category.name);
      amounts.push(incomeExpenseStatisticsForCategory.amount);
      colors.push(incomeExpenseStatisticsForCategory.category.color);
    });

    return {
      labels: names,
      data: amounts,
      colors: colors
    }
  }

  parseIncomeExpenseStatisticsForMonth(incomeExpenseStatisticsForMonths: IncomeExpenseStatisticsForMonth[]) {
    let months: string[] = [];
    let amounts: number[][] = [[], [], []];

    incomeExpenseStatisticsForMonths.forEach((incomeExpenseStatisticsForMonth: IncomeExpenseStatisticsForMonth) => {
      if (
        incomeExpenseStatisticsForMonth.incomeAmount == 0 &&
        incomeExpenseStatisticsForMonth.expenseAmount == 0 &&
        incomeExpenseStatisticsForMonth.totalAmount == 0
      ) return;

      months.push(incomeExpenseStatisticsForMonth.yearMonth);
      amounts[0].push(incomeExpenseStatisticsForMonth.incomeAmount);
      amounts[1].push(incomeExpenseStatisticsForMonth.expenseAmount);
      amounts[2].push(incomeExpenseStatisticsForMonth.totalAmount);
    });

    return {
      labels: months,
      data: amounts,
    };
  }

}
