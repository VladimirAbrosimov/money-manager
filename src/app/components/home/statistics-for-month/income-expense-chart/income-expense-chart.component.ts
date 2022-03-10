import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NoteType} from "../../../../models/note-type";
import {Subscription} from "rxjs";
import {IncomeExpenseStatisticsService} from "../../../../services/income-expense-statistics.service";
import {SharedNotesService} from "../../../../services/shared-notes.service";
import {IncomeExpenseStatisticsForCategory} from "../../../../models/income-expense-statistics-for-category";
import {ChartDataParserService} from "../../../../services/chart-data-parser.service";

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
  data: any;
  options: any;

  private noteCreatedSubscription: Subscription;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private sharedNotesService: SharedNotesService,
    private chartDataParserService: ChartDataParserService
  ) {
  }

  ngOnInit(): void {
    this.loadChart(this.noteType);
    this.noteCreatedSubscription = this.sharedNotesService.currentMessage.subscribe(() => {
      this.loadChart(this.noteType);
    })
  }

  ngOnDestroy(): void {
    this.noteCreatedSubscription.unsubscribe();
  }

  private loadChart(noteType: NoteType): void {
    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsInCurrentMonthByTypeSortedByCategory(noteType).subscribe({
      next: (incomeExpenseStatisticsForCategories: IncomeExpenseStatisticsForCategory[]) => {
        const chartData: ChartData = this.chartDataParserService.parseIncomeExpenseStatisticsForCategory(incomeExpenseStatisticsForCategories);
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
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          align: 'start',
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
}
