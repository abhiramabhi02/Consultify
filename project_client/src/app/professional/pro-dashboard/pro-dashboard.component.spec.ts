import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDashboardComponent } from './pro-dashboard.component';

describe('ProDashboardComponent', () => {
  let component: ProDashboardComponent;
  let fixture: ComponentFixture<ProDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProDashboardComponent]
    });
    fixture = TestBed.createComponent(ProDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
