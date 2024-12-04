import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraZvornikComponent } from './camera-zvornik.component';

describe('CameraZvornikComponent', () => {
  let component: CameraZvornikComponent;
  let fixture: ComponentFixture<CameraZvornikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraZvornikComponent]
    });
    fixture = TestBed.createComponent(CameraZvornikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
