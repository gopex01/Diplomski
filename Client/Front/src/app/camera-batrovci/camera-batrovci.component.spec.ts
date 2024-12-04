import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraBatrovciComponent } from './camera-batrovci.component';

describe('CameraBatrovciComponent', () => {
  let component: CameraBatrovciComponent;
  let fixture: ComponentFixture<CameraBatrovciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraBatrovciComponent]
    });
    fixture = TestBed.createComponent(CameraBatrovciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
