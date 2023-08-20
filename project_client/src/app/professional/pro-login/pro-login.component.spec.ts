import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProLoginComponent } from './pro-login.component';

describe('ProLoginComponent', () => {
  let component: ProLoginComponent;
  let fixture: ComponentFixture<ProLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProLoginComponent]
    });
    fixture = TestBed.createComponent(ProLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
