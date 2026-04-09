import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { authGuard, guestGuard } from './auth.guard';
import { selectInitialized, selectIsLoggedIn } from './auth.selectors';

describe('authGuard', () => {
  let store: MockStore;
  let createUrlTree: jest.Mock;

  function setup(initialized: boolean, isLoggedIn: boolean) {
    createUrlTree = jest.fn().mockReturnValue({ toString: () => '/auth/sign-in' });
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectInitialized, value: initialized },
            { selector: selectIsLoggedIn, value: isLoggedIn },
          ],
        }),
        { provide: Router, useValue: { createUrlTree, navigate: jest.fn() } },
      ],
    });
    store = TestBed.inject(MockStore);
  }

  afterEach(() => TestBed.resetTestingModule());

  it('allows access when authenticated and initialized', async () => {
    setup(true, true);
    const result = await firstValueFrom(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never)));
    expect(result).toBe(true);
  });

  it('redirects to /auth/sign-in when not authenticated', async () => {
    setup(true, false);
    const result = await firstValueFrom(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never)));
    expect(createUrlTree).toHaveBeenCalledWith(['/auth/sign-in']);
    expect(result).toBeDefined();
  });
});

describe('guestGuard', () => {
  let store: MockStore;
  let createUrlTree: jest.Mock;

  function setup(initialized: boolean, isLoggedIn: boolean) {
    createUrlTree = jest.fn().mockReturnValue({ toString: () => '/posts' });
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectInitialized, value: initialized },
            { selector: selectIsLoggedIn, value: isLoggedIn },
          ],
        }),
        { provide: Router, useValue: { createUrlTree, navigate: jest.fn() } },
      ],
    });
    store = TestBed.inject(MockStore);
  }

  afterEach(() => TestBed.resetTestingModule());

  it('allows access when NOT authenticated', async () => {
    setup(true, false);
    const result = await firstValueFrom(TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never)));
    expect(result).toBe(true);
  });

  it('redirects to /posts when already authenticated', async () => {
    setup(true, true);
    const result = await firstValueFrom(TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never)));
    expect(createUrlTree).toHaveBeenCalledWith(['/posts']);
    expect(result).toBeDefined();
  });
});
