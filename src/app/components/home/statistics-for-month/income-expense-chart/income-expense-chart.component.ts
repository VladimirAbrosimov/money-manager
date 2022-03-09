import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NoteType} from "../../../../models/note-type";
import {Subscription} from "rxjs";
import {IncomeExpenseStatisticsService} from "../../../../services/income-expense-statistics.service";
import {SharedNotesService} from "../../../../services/shared-notes.service";
import {Note} from "../../../../models/note";
import {TotalMoney} from "../../../../models/total-money";

type ChartData = {
  labels: string[],
  data: number[],
  colors: string[]
}

@Component({
  selector: 'app-income-expense-chart',
  templateUrl: './income-expense-chart.component.html',
  styleUrls: ['./income-expense-chart.component.scss']
})
export class IncomeExpenseChartComponent implements OnInit, OnDestroy {
  @Input() noteType: NoteType;
  type: string;
  size: string = '400';
  data: any;
  options: any;

  private noteCreatedSubscription: Subscription;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private sharedNotesService: SharedNotesService
  ) {
  }

  ngOnInit(): void {
    this.loadChart(this.noteType);
    this.noteCreatedSubscription = this.sharedNotesService.currentMessage.subscribe((note: Note) => {
      this.loadChart(this.noteType);
    })
  }

  ngOnDestroy(): void {
    this.noteCreatedSubscription.unsubscribe();
  }

  private loadChart(noteType: NoteType): void {
    this.incomeExpenseStatisticsService.getTotalMoneyInCurrentMonthByTypeSortedByCategory(noteType).subscribe({
      next: (totalMoneys: TotalMoney[]) => {
        const chartData: ChartData = this.parseChartData(totalMoneys);
        this.initChart(chartData);
      }
    });
  }

  private initChart(chartData: ChartData): void {
    this.type = 'doughnut';

    this.data = {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data,
        backgroundColor: chartData.colors,
        hoverBackgroundColor: chartData.colors
      }]
    };

    this.options = {
      responsive: false,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              family: 'Montserrat',
              size: 16
            }
          }
        }
      }
    }
  }

  private parseChartData(totalMoneys: TotalMoney[]): ChartData {
    let names = [];
    let amounts = [];
    let colors = [];

    totalMoneys.forEach((totalMoney: TotalMoney) => {
      names.push(totalMoney.category.name);
      amounts.push(totalMoney.amount);
      colors.push(totalMoney.category.color);
    });

    return {
      labels: names,
      data: amounts,
      colors: colors
    };
  }
}
