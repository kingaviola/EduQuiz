import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableQuizComponent } from './fillable-quiz.component';

describe('FillableQuizComponent', () => {
  let component: FillableQuizComponent;
  let fixture: ComponentFixture<FillableQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillableQuizComponent]
    });
    fixture = TestBed.createComponent(FillableQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
