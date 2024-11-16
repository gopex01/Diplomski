import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapForRestComponent } from './map-for-rest.component';

describe('MapForRestComponent', () => {
  let component: MapForRestComponent;
  let fixture: ComponentFixture<MapForRestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapForRestComponent]
    });
    fixture = TestBed.createComponent(MapForRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
