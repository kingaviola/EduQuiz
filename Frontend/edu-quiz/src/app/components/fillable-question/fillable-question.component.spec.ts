import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableQuestionComponent } from './fillable-question.component';

describe('FillableQuizComponent', () => {
  let component: FillableQuestionComponent;
  let fixture: ComponentFixture<FillableQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillableQuestionComponent]
    });
    fixture = TestBed.createComponent(FillableQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
