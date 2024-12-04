import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraJabukaComponent } from './camera-jabuka.component';

describe('CameraJabukaComponent', () => {
  let component: CameraJabukaComponent;
  let fixture: ComponentFixture<CameraJabukaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraJabukaComponent]
    });
    fixture = TestBed.createComponent(CameraJabukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
