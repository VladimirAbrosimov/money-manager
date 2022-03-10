import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseForAllTimeSortedByCategoryChartComponent } from './income-expense-for-all-time-sorted-by-category-chart.component';

describe('IncomeExpenseForAllTimeSortedByCategoryChartComponent', () => {
  let component: IncomeExpenseForAllTimeSortedByCategoryChartComponent;
  let fixture: ComponentFixture<IncomeExpenseForAllTimeSortedByCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeExpenseForAllTimeSortedByCategoryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseForAllTimeSortedByCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
