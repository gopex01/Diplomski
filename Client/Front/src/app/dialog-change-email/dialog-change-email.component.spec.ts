import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeEmailComponent } from './dialog-change-email.component';

describe('DialogChangeEmailComponent', () => {
  let component: DialogChangeEmailComponent;
  let fixture: ComponentFixture<DialogChangeEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChangeEmailComponent]
    });
    fixture = TestBed.createComponent(DialogChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
