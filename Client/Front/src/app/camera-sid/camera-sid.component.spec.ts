import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraSidComponent } from './camera-sid.component';

describe('CameraSidComponent', () => {
  let component: CameraSidComponent;
  let fixture: ComponentFixture<CameraSidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraSidComponent]
    });
    fixture = TestBed.createComponent(CameraSidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
