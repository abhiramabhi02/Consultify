import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProForgotPasswordComponent } from './pro-forgot-password.component';

describe('ProForgotPasswordComponent', () => {
  let component: ProForgotPasswordComponent;
  let fixture: ComponentFixture<ProForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(ProForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
