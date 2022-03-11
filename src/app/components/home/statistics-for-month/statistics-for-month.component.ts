import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncomeExpenseStatisticsService} from "../../../services/income-expense-statistics.service";
import {NoteType} from "../../../models/note-type";
import {SharedNotesService} from "../../../services/shared-notes.service";
import {Subscription} from "rxjs";
import {Note} from "../../../models/note";
import {IncomeExpenseStatisticsForType} from "../../../models/income-expense-statistics-for-type";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-statistics-for-month',
  templateUrl: './statistics-for-month.component.html',
  styleUrls: ['./statistics-for-month.component.scss']
})
export class StatisticsForMonthComponent implements OnInit, OnDestroy {
  public totalAmountInCurrentMonth: number = 0;
  public expenseAmountInCurrentMonth: number = 0;
  public incomeAmountInCurrentMonth: number = 0;
  public noteType: NoteType = 'EXPENSE';
  public noteTypeName: string = this.noteType == 'EXPENSE' ? 'Расходы': 'Доходы';
  public currentMonth: string = this.getMonthNameByNumber(new Date().getMonth());
  public currency;

  private noteCreatedSubscription: Subscription;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private sharedNotesService: SharedNotesService,
    private configurationService: ConfigurationService
  ) {
  }

  ngOnInit(): void {
    this.currency = this.configurationService.getValue('currency', 'RUB');
    this.loadTotalAmountInCurrentMonth();
    this.loadIncomeExpenseAmountInCurrentMonth();
    this.noteCreatedSubscription = this.sharedNotesService.currentMessage.subscribe({
      next: (note: Note) => {
        if (note) {
          this.loadTotalAmountInCurrentMonth();
          this.loadIncomeExpenseAmountInCurrentMonth();
        }
      }
    });


    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsForCurrentYearSortedByMonth().subscribe();
  }

  ngOnDestroy(): void {
    this.noteCreatedSubscription.unsubscribe();
  }

  private loadTotalAmountInCurrentMonth(): void {
    this.incomeExpenseStatisticsService.getTotalAmountInCurrentMonth().subscribe((totalMoney: number) => {
      this.totalAmountInCurrentMonth = totalMoney;
    });
  }

  private loadIncomeExpenseAmountInCurrentMonth(): void {
    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsInCurrentMonthSortedByType().subscribe((incomeExpenseStatisticsForType: IncomeExpenseStatisticsForType[]) => {
      incomeExpenseStatisticsForType.map((incomeExpenseStatisticsForType: IncomeExpenseStatisticsForType) => {
        if (incomeExpenseStatisticsForType.type == 'INCOME') {
          this.incomeAmountInCurrentMonth = incomeExpenseStatisticsForType.amount;
        } else if (incomeExpenseStatisticsForType.type == 'EXPENSE') {
          this.expenseAmountInCurrentMonth = incomeExpenseStatisticsForType.amount;
        }
      });
    });
  }

  // функция необходима т.к. date pipe выводит названия месяцев в неправильном склонении
  private getMonthNameByNumber(number: number): string {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months[number];
  }

  public switchNoteType() {
    if (this.noteType == 'EXPENSE') {
      this.noteType = 'INCOME';
      this.noteTypeName = 'Доходы';
    } else {
      this.noteType = 'EXPENSE';
      this.noteTypeName = 'Расходы';
    }
  }

}
