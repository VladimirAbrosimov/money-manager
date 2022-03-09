import { TestBed } from '@angular/core/testing';

import { NoteCategoryService } from './note-category.service';

describe('NoteCategoryService', () => {
  let service: NoteCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
