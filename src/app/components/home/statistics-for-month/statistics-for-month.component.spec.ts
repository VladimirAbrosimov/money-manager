import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsForMonthComponent } from './statistics-for-month.component';

describe('StatisticsForMonthComponent', () => {
  let component: StatisticsForMonthComponent;
  let fixture: ComponentFixture<StatisticsForMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsForMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsForMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
