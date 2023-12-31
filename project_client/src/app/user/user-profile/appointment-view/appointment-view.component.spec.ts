import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentViewComponent } from './appointment-view.component';

describe('AppointmentViewComponent', () => {
  let component: AppointmentViewComponent;
  let fixture: ComponentFixture<AppointmentViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentViewComponent]
    });
    fixture = TestBed.createComponent(AppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
