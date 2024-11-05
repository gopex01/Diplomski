import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTravelComponent } from './search-travel.component';

describe('SearchTravelComponent', () => {
  let component: SearchTravelComponent;
  let fixture: ComponentFixture<SearchTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTravelComponent]
    });
    fixture = TestBed.createComponent(SearchTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
