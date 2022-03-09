import { TestBed } from '@angular/core/testing';

import { IncomeExpenseStatisticsService } from './income-expense-statistics.service';

describe('IncomeExpenseStatisticsService', () => {
  let service: IncomeExpenseStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpenseStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
