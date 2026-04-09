import { selectError, selectIsLoading } from './settings.selectors';

describe('Settings Selectors', () => {
  describe('selectIsLoading', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectIsLoading.projector('loading')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectIsLoading.projector('init')).toBe(false);
      expect(selectIsLoading.projector('loaded')).toBe(false);
      expect(selectIsLoading.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectError', () => {
    it('returns the error string from error callState', () => {
      expect(selectError.projector({ error: 'settings load failed' })).toBe('settings load failed');
    });

    it('returns null for non-error states', () => {
      expect(selectError.projector('init')).toBeNull();
      expect(selectError.projector('loading')).toBeNull();
      expect(selectError.projector('loaded')).toBeNull();
    });
  });
});
