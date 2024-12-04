import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KameraComponent } from './kamera.component';

describe('KameraComponent', () => {
  let component: KameraComponent;
  let fixture: ComponentFixture<KameraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KameraComponent]
    });
    fixture = TestBed.createComponent(KameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
