import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessionalsComponent } from './admin-professionals.component';

describe('AdminProfessionalsComponent', () => {
  let component: AdminProfessionalsComponent;
  let fixture: ComponentFixture<AdminProfessionalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfessionalsComponent]
    });
    fixture = TestBed.createComponent(AdminProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
