import { selectError, selectLoaded, selectLoading } from './post.selectors';

describe('Post Selectors', () => {
  describe('selectLoading', () => {
    it('returns true when callState is "loading"', () => {
      expect(selectLoading.projector('loading')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectLoading.projector('init')).toBe(false);
      expect(selectLoading.projector('loaded')).toBe(false);
      expect(selectLoading.projector({ error: 'err' })).toBe(false);
    });
  });

  describe('selectLoaded', () => {
    it('returns true when callState is "loaded"', () => {
      expect(selectLoaded.projector('loaded')).toBe(true);
    });

    it('returns false for other states', () => {
      expect(selectLoaded.projector('init')).toBe(false);
      expect(selectLoaded.projector('loading')).toBe(false);
    });
  });

  describe('selectError', () => {
    it('returns the error string from error callState', () => {
      expect(selectError.projector({ error: 'post not found' })).toBe('post not found');
    });

    it('returns null for non-error states', () => {
      expect(selectError.projector('init')).toBeNull();
      expect(selectError.projector('loading')).toBeNull();
      expect(selectError.projector('loaded')).toBeNull();
    });
  });
});
