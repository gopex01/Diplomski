import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraGostunComponent } from './camera-gostun.component';

describe('CameraGostunComponent', () => {
  let component: CameraGostunComponent;
  let fixture: ComponentFixture<CameraGostunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraGostunComponent]
    });
    fixture = TestBed.createComponent(CameraGostunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
