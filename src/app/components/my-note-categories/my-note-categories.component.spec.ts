import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNoteCategoriesComponent } from './my-note-categories.component';

describe('MyNoteCategoriesComponent', () => {
  let component: MyNoteCategoriesComponent;
  let fixture: ComponentFixture<MyNoteCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNoteCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNoteCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
