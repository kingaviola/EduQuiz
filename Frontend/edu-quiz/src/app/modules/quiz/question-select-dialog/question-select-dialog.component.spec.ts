import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSelectDialogComponent } from './question-select-dialog.component';

describe('QuestionSelectDialogComponent', () => {
  let component: QuestionSelectDialogComponent;
  let fixture: ComponentFixture<QuestionSelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionSelectDialogComponent]
    });
    fixture = TestBed.createComponent(QuestionSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
