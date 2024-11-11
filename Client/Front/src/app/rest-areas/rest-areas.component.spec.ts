import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestAreasComponent } from './rest-areas.component';

describe('RestAreasComponent', () => {
  let component: RestAreasComponent;
  let fixture: ComponentFixture<RestAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestAreasComponent]
    });
    fixture = TestBed.createComponent(RestAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
