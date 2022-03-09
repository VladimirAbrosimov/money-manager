import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteCategoryComponent } from './add-note-category.component';

describe('AddNoteCategoryComponent', () => {
  let component: AddNoteCategoryComponent;
  let fixture: ComponentFixture<AddNoteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
