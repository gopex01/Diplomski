import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraRacaComponent } from './camera-raca.component';

describe('CameraRacaComponent', () => {
  let component: CameraRacaComponent;
  let fixture: ComponentFixture<CameraRacaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraRacaComponent]
    });
    fixture = TestBed.createComponent(CameraRacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
