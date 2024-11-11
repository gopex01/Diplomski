import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessChangedComponent } from './dialog-success-changed.component';

describe('DialogSuccessChangedComponent', () => {
  let component: DialogSuccessChangedComponent;
  let fixture: ComponentFixture<DialogSuccessChangedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSuccessChangedComponent]
    });
    fixture = TestBed.createComponent(DialogSuccessChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
