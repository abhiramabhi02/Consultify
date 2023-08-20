import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRegistrationComponent } from './pro-registration.component';

describe('ProRegistrationComponent', () => {
  let component: ProRegistrationComponent;
  let fixture: ComponentFixture<ProRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProRegistrationComponent]
    });
    fixture = TestBed.createComponent(ProRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
