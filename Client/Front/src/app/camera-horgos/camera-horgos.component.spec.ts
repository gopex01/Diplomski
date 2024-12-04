import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraHorgosComponent } from './camera-horgos.component';

describe('CameraHorgosComponent', () => {
  let component: CameraHorgosComponent;
  let fixture: ComponentFixture<CameraHorgosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraHorgosComponent]
    });
    fixture = TestBed.createComponent(CameraHorgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
