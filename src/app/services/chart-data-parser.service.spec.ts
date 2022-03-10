import { TestBed } from '@angular/core/testing';

import { ChartDataParserService } from './chart-data-parser.service';

describe('ChartDataParserService', () => {
  let service: ChartDataParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
