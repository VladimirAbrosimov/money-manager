import { TestBed } from '@angular/core/testing';

import { AbstractSharedDataService } from './abstract-shared-data.service';

describe('AbstractSharedDataService', () => {
  let service: AbstractSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
