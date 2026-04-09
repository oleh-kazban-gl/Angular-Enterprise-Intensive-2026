import { selectError, selectIsLoading, selectIsLoggedIn } from './auth.selectors';
import { selectInitialized, selectToken } from './auth.selectors';

describe('Auth Selectors', () => {
  describe('selectIsLoggedIn', () => {
    it('returns true when a token is set', () => {
      expect(selectIsLoggedIn.projector('some-token')).toBe(true);
    });

    it('returns false when token is null', () => {
      expect(selectIsLoggedIn.projector(null)).toBe(false);
    });

    it('returns false when token is empty string', () => {
      expect(selectIsLoggedIn.projector('')).toBe(false);
    });
  });

  describe('selectIsLoading', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectIsLoading.projector('loading')).toBe(true);
    });

    it('returns false when callState is "init"', () => {
      expect(selectIsLoading.projector('init')).toBe(false);
    });

    it('returns false when callState is "loaded"', () => {
      expect(selectIsLoading.projector('loaded')).toBe(false);
    });

    it('returns false when callState is an error object', () => {
      expect(selectIsLoading.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectError', () => {
    it('returns the error string when callState is an error object', () => {
      expect(selectError.projector({ error: 'sign-in failed' })).toBe('sign-in failed');
    });

    it('returns null for "init"', () => {
      expect(selectError.projector('init')).toBeNull();
    });

    it('returns null for "loading"', () => {
      expect(selectError.projector('loading')).toBeNull();
    });

    it('returns null for "loaded"', () => {
      expect(selectError.projector('loaded')).toBeNull();
    });
  });

  describe('selectToken', () => {
    it('is exported from authFeature', () => {
      expect(selectToken).toBeDefined();
    });
  });

  describe('selectInitialized', () => {
    it('is exported from authFeature', () => {
      expect(selectInitialized).toBeDefined();
    });
  });
});
