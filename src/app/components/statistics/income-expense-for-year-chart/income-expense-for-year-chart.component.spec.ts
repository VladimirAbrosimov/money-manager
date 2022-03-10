import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseForYearChartComponent } from './income-expense-for-year-chart.component';

describe('IncomeExpenseForYearChartComponent', () => {
  let component: IncomeExpenseForYearChartComponent;
  let fixture: ComponentFixture<IncomeExpenseForYearChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeExpenseForYearChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseForYearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
