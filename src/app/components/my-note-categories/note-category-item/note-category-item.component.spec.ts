import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCategoryItemComponent } from './note-category-item.component';

describe('NoteCategoryItemComponent', () => {
  let component: NoteCategoryItemComponent;
  let fixture: ComponentFixture<NoteCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteCategoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
