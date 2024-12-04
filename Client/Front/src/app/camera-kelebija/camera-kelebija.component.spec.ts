import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraKelebijaComponent } from './camera-kelebija.component';

describe('CameraKelebijaComponent', () => {
  let component: CameraKelebijaComponent;
  let fixture: ComponentFixture<CameraKelebijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraKelebijaComponent]
    });
    fixture = TestBed.createComponent(CameraKelebijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
