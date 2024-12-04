import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraKotromanComponent } from './camera-kotroman.component';

describe('CameraKotromanComponent', () => {
  let component: CameraKotromanComponent;
  let fixture: ComponentFixture<CameraKotromanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraKotromanComponent]
    });
    fixture = TestBed.createComponent(CameraKotromanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
