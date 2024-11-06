import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessRegistrationComponent } from './dialog-success-registration.component';

describe('DialogSuccessRegistrationComponent', () => {
  let component: DialogSuccessRegistrationComponent;
  let fixture: ComponentFixture<DialogSuccessRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSuccessRegistrationComponent]
    });
    fixture = TestBed.createComponent(DialogSuccessRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
