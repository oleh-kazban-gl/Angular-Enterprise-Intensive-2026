import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('signIn', () => {
    it('POSTs to /auth with email and password', () => {
      service.signIn('user@test.com', 'secret').subscribe(res => {
        expect(res).toEqual({ token: 'jwt-token' });
      });
      const req = httpMock.expectOne('/auth');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'user@test.com', password: 'secret' });
      req.flush({ token: 'jwt-token' });
    });
  });

  describe('signUp', () => {
    it('POSTs to /auth/sign-up with name, email and password', () => {
      service.signUp('Alice', 'alice@test.com', 'pass').subscribe();
      const req = httpMock.expectOne('/auth/sign-up');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: 'Alice', email: 'alice@test.com', password: 'pass' });
      req.flush(null);
    });
  });

  describe('getStoredToken', () => {
    it('returns null when no token has been saved', () => {
      expect(service.getStoredToken()).toBeNull();
    });

    it('returns the token that was previously saved', () => {
      localStorage.setItem('token', 'my-token');
      expect(service.getStoredToken()).toBe('my-token');
    });
  });

  describe('saveToken', () => {
    it('persists the token in localStorage', () => {
      service.saveToken('abc123');
      expect(localStorage.getItem('token')).toBe('abc123');
    });
  });

  describe('clearStorage', () => {
    it('removes the token from localStorage', () => {
      localStorage.setItem('token', 'abc123');
      service.clearStorage();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
