import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraVrskaCukaComponent } from './camera-vrska-cuka.component';

describe('CameraVrskaCukaComponent', () => {
  let component: CameraVrskaCukaComponent;
  let fixture: ComponentFixture<CameraVrskaCukaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraVrskaCukaComponent]
    });
    fixture = TestBed.createComponent(CameraVrskaCukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
