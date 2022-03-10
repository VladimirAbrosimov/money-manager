import { Component, OnInit } from '@angular/core';
import {IncomeExpenseStatisticsService} from "../../../services/income-expense-statistics.service";
import {IncomeExpenseStatisticsForMonth} from "../../../models/income-expense-statistics-for-month";
import {ChartDataParserService} from "../../../services/chart-data-parser.service";

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
  size: string = '400';
  data: any;
  options: any;

  constructor(
    private incomeExpenseStatisticsService: IncomeExpenseStatisticsService,
    private chartDataParserService: ChartDataParserService
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
          backgroundColor: '#264b96',
          borderColor: '#264b96'
        },
        {
          type: 'bar',
          label: 'Доходы',
          data: chartData.data[0],
          backgroundColor: '#238823',
          borderColor: '#238823'
        },
        {
          type: 'bar',
          label: 'Расходы',
          data: chartData.data[1],
          backgroundColor: '#d2222d',
          borderColor: '#d2222d'
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 30,
            boxHeight: 15,
            font: {
              family: 'Montserrat',
              size: 16
            }
          }
        }
      },
      elements: {
        bar: {
          borderRadius: 6
        }
      }
    }
  }

}
