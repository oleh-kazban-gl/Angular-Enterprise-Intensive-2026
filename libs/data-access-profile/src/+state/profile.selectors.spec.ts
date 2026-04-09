import { selectProfileError, selectProfileLoaded, selectProfileLoading } from './profile.selectors';

describe('Profile Selectors', () => {
  describe('selectProfileLoading', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectProfileLoading.projector('loading')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectProfileLoading.projector('init')).toBe(false);
      expect(selectProfileLoading.projector('loaded')).toBe(false);
      expect(selectProfileLoading.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectProfileLoaded', () => {
    it('returns true when callState is "loaded"', () => {
      expect(selectProfileLoaded.projector('loaded')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectProfileLoaded.projector('init')).toBe(false);
      expect(selectProfileLoaded.projector('loading')).toBe(false);
    });
  });

  describe('selectProfileError', () => {
    it('returns the error string from error callState', () => {
      expect(selectProfileError.projector({ error: 'profile load failed' })).toBe('profile load failed');
    });

    it('returns null for non-error states', () => {
      expect(selectProfileError.projector('init')).toBeNull();
      expect(selectProfileError.projector('loading')).toBeNull();
      expect(selectProfileError.projector('loaded')).toBeNull();
    });
  });
});
