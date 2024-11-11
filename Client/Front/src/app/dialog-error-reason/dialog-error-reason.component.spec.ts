import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorReasonComponent } from './dialog-error-reason.component';

describe('DialogErrorReasonComponent', () => {
  let component: DialogErrorReasonComponent;
  let fixture: ComponentFixture<DialogErrorReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogErrorReasonComponent]
    });
    fixture = TestBed.createComponent(DialogErrorReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
