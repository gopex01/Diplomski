import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraGradinaComponent } from './camera-gradina.component';

describe('CameraGradinaComponent', () => {
  let component: CameraGradinaComponent;
  let fixture: ComponentFixture<CameraGradinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraGradinaComponent]
    });
    fixture = TestBed.createComponent(CameraGradinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
