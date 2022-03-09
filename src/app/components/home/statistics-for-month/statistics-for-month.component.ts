import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncomeExpenseStatisticsService} from "../../../services/income-expense-statistics.service";
import {NoteType} from "../../../models/note-type";
import {SharedNotesService} from "../../../services/shared-notes.service";
import {Subscription} from "rxjs";
import {Note} from "../../../models/note";

@Component({
  selector: 'app-statistics-for-month',
  templateUrl: './statistics-for-month.component.html',
  styleUrls: ['./statistics-for-month.component.scss']
})
export class StatisticsForMonthComponent implements OnInit, OnDestroy {
  public totalMoneyInCurrentMonth: number = 0;
  public totalMoneyInCurrentMonthExpense: number = 0;
  public totalMoneyInCurrentMonthIncome: number = 0;
  public noteType: NoteType = 'EXPENSE';
  public noteTypeName: string = this.noteType == 'EXPENSE' ? 'Расходы': 'Доходы';
  public currentMonth: string = this.getMonthNameByNumber(new Date().getMonth());

  private noteCreatedSubscription: Subscription;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private sharedNotesService: SharedNotesService,
  ) {
  }

  ngOnInit(): void {
    this.loadTotalMoneyInCurrentMonth();
    this.loadTotalMoneyInCurrentMonthByType('EXPENSE');
    this.loadTotalMoneyInCurrentMonthByType('INCOME');
    this.noteCreatedSubscription = this.sharedNotesService.currentMessage.subscribe({
      next: (note: Note) => {
        if (note) {
          this.loadTotalMoneyInCurrentMonth();
          this.loadTotalMoneyInCurrentMonthByType(note.type);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.noteCreatedSubscription.unsubscribe();
  }

  private loadTotalMoneyInCurrentMonth(): void {
    this.incomeExpenseStatisticsService.getTotalMoneyInCurrentMonth().subscribe((totalMoney: number) => {
      this.totalMoneyInCurrentMonth = totalMoney;
    });
  }

  private loadTotalMoneyInCurrentMonthByType(noteType: NoteType): void {
    this.incomeExpenseStatisticsService.getTotalMoneyInCurrentMonthByType(noteType).subscribe((totalMoney: number) => {
      if (noteType == 'INCOME') {
        this.totalMoneyInCurrentMonthIncome = totalMoney;
      } else {
        this.totalMoneyInCurrentMonthExpense = totalMoney;
      }
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
