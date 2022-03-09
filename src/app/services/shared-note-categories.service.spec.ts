import { TestBed } from '@angular/core/testing';

import { SharedNoteCategoriesService } from './shared-note-categories.service';

describe('SharedNoteCategoriesService', () => {
  let service: SharedNoteCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedNoteCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
