import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTravelViewComponent } from './personal-travel-view.component';

describe('PersonalTravelViewComponent', () => {
  let component: PersonalTravelViewComponent;
  let fixture: ComponentFixture<PersonalTravelViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalTravelViewComponent]
    });
    fixture = TestBed.createComponent(PersonalTravelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
