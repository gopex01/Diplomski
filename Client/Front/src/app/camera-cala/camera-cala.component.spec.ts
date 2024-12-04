import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCalaComponent } from './camera-cala.component';

describe('CameraCalaComponent', () => {
  let component: CameraCalaComponent;
  let fixture: ComponentFixture<CameraCalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraCalaComponent]
    });
    fixture = TestBed.createComponent(CameraCalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
