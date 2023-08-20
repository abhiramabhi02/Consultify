import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProVerifymailComponent } from './pro-verifymail.component';

describe('ProVerifymailComponent', () => {
  let component: ProVerifymailComponent;
  let fixture: ComponentFixture<ProVerifymailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProVerifymailComponent]
    });
    fixture = TestBed.createComponent(ProVerifymailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
