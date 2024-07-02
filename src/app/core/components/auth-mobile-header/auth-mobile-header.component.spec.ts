import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMobileHeaderComponent } from './auth-mobile-header.component';

describe('AuthMobileHeaderComponent', () => {
  let component: AuthMobileHeaderComponent;
  let fixture: ComponentFixture<AuthMobileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthMobileHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthMobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
