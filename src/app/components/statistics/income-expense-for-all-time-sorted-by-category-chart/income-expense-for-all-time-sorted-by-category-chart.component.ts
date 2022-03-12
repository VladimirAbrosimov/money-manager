import {Component, Input, OnInit} from '@angular/core';
import {NoteType} from "../../../models/note-type";
import {IncomeExpenseStatisticsService} from "../../../services/income-expense-statistics.service";
import {ChartDataParserService} from "../../../services/chart-data-parser.service";
import {IncomeExpenseStatisticsForCategory} from "../../../models/income-expense-statistics-for-category";
import {ConfigurationService} from "../../../services/configuration.service";

type ChartData = {
  labels: string[],
  data: number[],
  colors: string[]
}

@Component({
  selector: 'app-income-expense-for-all-time-sorted-by-category-chart',
  templateUrl: './income-expense-for-all-time-sorted-by-category-chart.component.html',
  styleUrls: ['./income-expense-for-all-time-sorted-by-category-chart.component.scss']
})
export class IncomeExpenseForAllTimeSortedByCategoryChartComponent implements OnInit {
  @Input() noteType: NoteType;
  type: string;
  data: any;
  options: any;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private chartDataParserService: ChartDataParserService,
    private configurationService: ConfigurationService
  ) {
  }

  ngOnInit(): void {
    this.loadChart(this.noteType);
  }

  private loadChart(noteType: NoteType): void {
    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory(noteType).subscribe({
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

    this.options = this.configurationService.getValue('doughnutAndPieChartsOptions');
  }

}
