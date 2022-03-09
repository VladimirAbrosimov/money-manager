import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCategoriesListComponent } from './note-categories-list.component';

describe('NoteCategoriesListComponent', () => {
  let component: NoteCategoriesListComponent;
  let fixture: ComponentFixture<NoteCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
