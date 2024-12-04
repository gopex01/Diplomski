import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraTrbusnicaComponent } from './camera-trbusnica.component';

describe('CameraTrbusnicaComponent', () => {
  let component: CameraTrbusnicaComponent;
  let fixture: ComponentFixture<CameraTrbusnicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraTrbusnicaComponent]
    });
    fixture = TestBed.createComponent(CameraTrbusnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
