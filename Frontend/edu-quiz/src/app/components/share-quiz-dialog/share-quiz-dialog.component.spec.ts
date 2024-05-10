import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQuizDialogComponent } from './share-quiz-dialog.component';

describe('ShareQuizDialogComponent', () => {
  let component: ShareQuizDialogComponent;
  let fixture: ComponentFixture<ShareQuizDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareQuizDialogComponent]
    });
    fixture = TestBed.createComponent(ShareQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
