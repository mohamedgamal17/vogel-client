import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileGuardFn } from './profile.guard';

describe('profileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileGuardFn(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
