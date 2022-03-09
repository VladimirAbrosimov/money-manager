import { TestBed } from '@angular/core/testing';

import { SharedNotesService } from './shared-notes.service';

describe('SharedNotesService', () => {
  let service: SharedNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
