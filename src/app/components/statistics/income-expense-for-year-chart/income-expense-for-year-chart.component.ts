import { Component, OnInit } from '@angular/core';
import {IncomeExpenseStatisticsService} from "../../../services/income-expense-statistics.service";
import {IncomeExpenseStatisticsForMonth} from "../../../models/income-expense-statistics-for-month";
import {ChartDataParserService} from "../../../services/chart-data-parser.service";
import {ConfigurationService} from "../../../services/configuration.service";

type ChartData = {
  labels: string[],
  data: number[][]
}

@Component({
  selector: 'app-income-expense-for-year-chart',
  templateUrl: './income-expense-for-year-chart.component.html',
  styleUrls: ['./income-expense-for-year-chart.component.scss']
})
export class IncomeExpenseForYearChartComponent implements OnInit {
  data: any;
  options: any;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private chartDataParserService: ChartDataParserService,
    private configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.loadChart();

    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsForAllTimeByTypeSortedByCategory('EXPENSE').subscribe();
  }

  private loadChart(): void {
    this.incomeExpenseStatisticsService.getIncomeExpenseStatisticsForCurrentYearSortedByMonth().subscribe({
      next: (incomeExpenseStatisticsForMonths: IncomeExpenseStatisticsForMonth[]) => {
        const chartData: ChartData = this.chartDataParserService.parseIncomeExpenseStatisticsForMonth(incomeExpenseStatisticsForMonths);
        this.initChart(chartData);
      }
    });
  }

  private initChart(chartData: ChartData): void {
    this.data = {
      labels: chartData.labels,
      datasets: [
        {
          type: 'line',
          label: 'Итого',
          data: chartData.data[2],
          backgroundColor: this.configurationService.getValue('totalAmountBarColor'),
          borderColor: this.configurationService.getValue('totalAmountBarColor')
        },
        {
          type: 'bar',
          label: 'Доходы',
          data: chartData.data[0],
          backgroundColor: this.configurationService.getValue('incomeAmountBarColor'),
          borderColor: this.configurationService.getValue('incomeAmountBarColor')
        },
        {
          type: 'bar',
          label: 'Расходы',
          data: chartData.data[1],
          backgroundColor: this.configurationService.getValue('expenseAmountBarColor'),
          borderColor: this.configurationService.getValue('expenseAmountBarColor')
        }
      ]
    };

    this.options = this.configurationService.getValue("barChartOptions");
  }

}
