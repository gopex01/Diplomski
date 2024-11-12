import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonalTravelComponent } from './list-personal-travel.component';

describe('ListPersonalTravelComponent', () => {
  let component: ListPersonalTravelComponent;
  let fixture: ComponentFixture<ListPersonalTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPersonalTravelComponent]
    });
    fixture = TestBed.createComponent(ListPersonalTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
