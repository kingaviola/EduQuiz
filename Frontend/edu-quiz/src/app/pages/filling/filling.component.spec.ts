import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingComponent } from './filling.component';

describe('FillingComponent', () => {
  let component: FillingComponent;
  let fixture: ComponentFixture<FillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillingComponent]
    });
    fixture = TestBed.createComponent(FillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
