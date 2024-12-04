import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraPresevoComponent } from './camera-presevo.component';

describe('CameraPresevoComponent', () => {
  let component: CameraPresevoComponent;
  let fixture: ComponentFixture<CameraPresevoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraPresevoComponent]
    });
    fixture = TestBed.createComponent(CameraPresevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
