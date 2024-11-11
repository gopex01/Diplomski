import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRestAreasComponent } from './list-rest-areas.component';

describe('ListRestAreasComponent', () => {
  let component: ListRestAreasComponent;
  let fixture: ComponentFixture<ListRestAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRestAreasComponent]
    });
    fixture = TestBed.createComponent(ListRestAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
