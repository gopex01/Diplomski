import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraVatinComponent } from './camera-vatin.component';

describe('CameraVatinComponent', () => {
  let component: CameraVatinComponent;
  let fixture: ComponentFixture<CameraVatinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraVatinComponent]
    });
    fixture = TestBed.createComponent(CameraVatinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
