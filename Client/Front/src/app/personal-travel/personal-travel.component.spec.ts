import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTravelComponent } from './personal-travel.component';

describe('PersonalTravelComponent', () => {
  let component: PersonalTravelComponent;
  let fixture: ComponentFixture<PersonalTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalTravelComponent]
    });
    fixture = TestBed.createComponent(PersonalTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
